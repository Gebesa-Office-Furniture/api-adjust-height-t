# Height Adjustment Feature Implementation

This document explains how the height adjustment feature for standing desks works and how to fully implement it in your application.

## Overview

The height adjustment feature allows the mobile app to send a target height value to the backend, which then initiates an automatic height adjustment on the connected standing desk. The desk will move up or down until it reaches the specified height.

## Components

The implementation consists of the following components:

1. **Backend API** - A new Express.js endpoint to process height adjustment requests
2. **Database** - New tables and stored procedures to track height adjustments
3. **Mobile App** - Integration with the Bluetooth module to communicate with the desk

## Backend Implementation

### 1. Models

The `HeightAdjustmentModel.js` defines the structure for height adjustment requests:

```javascript
class HeightAdjustmentModel {
    /**
     * Create an instance of the HeightAdjustmentModel class.
     * @param {Object} params 
     * @param {number} params.iIdUser - Required - User ID
     * @param {string} params.sUUID - Required - Device UUID
     * @param {number} params.dTargetHeight - Required - Target height in inches
     * @param {number} params.iMemoryPosition - Optional - Memory position (1-4) if saving position
     */
    constructor(params = {}) {
        this.iIdUser = params.iIdUser;
        this.sUUID = params.sUUID;
        this.dTargetHeight = params.dTargetHeight;
        this.iMemoryPosition = params.iMemoryPosition;
    }
}
```

### 2. Service

The `deskService.js` includes an `adjustHeight` method that:
- Validates the desk connection
- Records the movement in the database
- Returns the appropriate response

### 3. Controller

The `deskController.js` contains an `adjustHeight` method that:
- Extracts and validates parameters from the request
- Uses the service to process the height adjustment
- Returns a standardized response to the client

### 4. Route

The route in `deskRoutes.js` exposes the endpoint:
```javascript
router.post("/adjust-height", deskController.adjustHeight);
```

## Database Changes

The implementation requires the following database changes:

1. **New Table**: `desk.heightAdjustments` - Stores a record of all height adjustment requests
2. **New Stored Procedure**: `desk.SP_AdjustHeight` - Processes height adjustment requests and updates related records

The SQL scripts for these changes are available in `height_adjustment_db_changes.sql`.

## Mobile App Integration

To implement this feature in the mobile app:

1. Make an HTTP POST request to the endpoint: `/session/desk/adjust-height`
2. Include the following parameters:
   - `sUUID` - The connected desk's UUID
   - `dTargetHeight` - The target height in inches
   - `iMemoryPosition` (optional) - Memory position to save (1-4)

3. When the API responds with success, use the Bluetooth module to send the appropriate command to the desk:

```dart
// Example implementation in Flutter app
Future<void> adjustDeskHeight(double targetHeightInches) async {
  try {
    // First adjust height via API
    final response = await dio.post(
      '$baseUrl/session/desk/adjust-height',
      data: {
        'sUUID': connectedDeskUUID,
        'dTargetHeight': targetHeightInches,
      },
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    
    if (response.statusCode == 200) {
      // Then use Bluetooth to command desk directly
      // (Use the moveToHeight method from the Bluetooth module)
      // Convert inches to mm for Bluetooth module
      int heightMM = (targetHeightInches * 25.4).round();
      await deskController.moveToHeight(heightMM);
    }
  } catch (error) {
    // Handle errors
    print('Error adjusting height: $error');
  }
}
```

## Bluetooth Module Integration

The Bluetooth module detailed in `BLUETOOTH_MODULE_DETAILED.md` provides a `moveToHeight` method that can be used to send the appropriate command to the desk:

```dart
// From the Bluetooth module
Future<void> moveToHeight(double targetHeight) async {
  if (targetHeight < minHeightMM || targetHeight > maxHeightMM) {
    _showErrorDialog('Target height out of range');
    return;
  }
  
  try {
    int heightMM = targetHeight.round();
    
    // Convert to 2-byte representation
    int highByte = (heightMM >> 8) & 0xFF;
    int lowByte = heightMM & 0xFF;
    
    // Calculate checksum
    int checksum = 0x1B + 0x02 + highByte + lowByte;
    
    final command = [0xF1, 0xF1, 0x1B, 0x02, highByte, lowByte, checksum, 0x7E];
    await _controlCharacteristic?.write(command, withoutResponse: true);
    
    _isMoving = true;
    _startNoDataTimer();
  } catch (e) {
    _showErrorDialog('Failed to send move to height command: $e');
  }
}
```

## API Documentation

The API endpoint is documented in `API-DOCUMENTATION.md` with the following specifications:

```
#### Adjust Desk Height
- **URL**: `/session/desk/adjust-height`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Adjusts the connected desk to a specific height. The system will automatically move the desk up or down to reach the target height.
- **Request Body**:
  ```json
  {
    "sUUID": "device_uuid_string",
    "dTargetHeight": 30.5,
    "iMemoryPosition": 1
  }
  ```
  Notes:
  - `sUUID`: Unique identifier of the connected desk
  - `dTargetHeight`: Target height in inches
  - `iMemoryPosition`: Optional. If provided, will also save this height as a memory position (1-4)
- **Response**:
  ```json
  {
    "result": "Height adjustment initiated",
    "targetHeight": 30.5,
    "deskUUID": "device_uuid_string",
    "memoryPosition": 1
  }
  ```
- **Status Codes**:
  - 200: Height adjustment initiated successfully
  - 400: Failed to initiate height adjustment (invalid parameters or desk not found)
```

## Next Steps for Implementation

1. **Execute the SQL Script**: Run `height_adjustment_db_changes.sql` on your database to create the necessary tables and stored procedures.

2. **Update the Backend**: Deploy the updated backend files:
   - `/src/modelsExtras/HeightAdjustmentModel.js` (new file)
   - `/src/services/deskService.js` (updated)
   - `/src/controllers/deskController.js` (updated)
   - `/src/routes/deskRoutes.js` (updated)

3. **Update the API Documentation**: Ensure the API documentation reflects the new endpoint.

4. **Integrate with Mobile App**: Implement the feature in the Flutter app, utilizing the Bluetooth module to communicate with the desk hardware.

5. **Test the Feature**: Test the feature thoroughly to ensure it works as expected:
   - Test with various desk models (both Type A and Type B configurations)
   - Test with edge cases (heights at min/max range)
   - Test error scenarios (disconnected desk, etc.)