# API Documentation

This document provides comprehensive documentation for all endpoints available in the Ascend API. Each endpoint is described with its parameters, request format, and response format.

## Base URL

The API runs on port 3000. Base URL structure:
```
http://[server-address]:3000
```

## Authentication

Most endpoints require authentication through JWT tokens. The token should be included in the request header as:
```
Authorization: Bearer [token]
```

## Endpoints

### Authentication

#### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Requires Auth**: No
- **Description**: Authenticates a user and returns access and refresh tokens.
- **Request Body**:
  ```json
  {
    "sEmail": "user@example.com",
    "sPassword": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "iId": 1,
      "sName": "John Doe",
      "sEmail": "user@example.com",
      "iViewMode": 1,
      "sViewMode": "Dark",
      "iIdLanguage": 1,
      "sLanguage": "English",
      "dWeightKG": 75.5,
      "dHeightM": 1.8,
      "iMeasureType": 1,
      "sMeasureType": "Metric",
      "objMemories": "[]",
      "objRoutine": "[]",
      "lastRoutine": null
    },
    "token": {
      "result": "jwt_token_string",
      "expiresIn": 3600
    },
    "refreshToken": {
      "result": "refresh_token_string",
      "expiresIn": 86400
    }
  }
  ```
- **Status Codes**:
  - 200: Successful login
  - 401: Invalid credentials

#### Register
- **URL**: `/auth/register`
- **Method**: POST
- **Requires Auth**: No
- **Description**: Registers a new user account.
- **Request Body**:
  ```json
  {
    "sEmail": "user@example.com",
    "sPassword": "password123",
    "sName": "John Doe",
    "sProfilePicture": "",
    "sPhoneNumber": "1234567890",
    "sLada": "+1",
    "sIdExternalProvider": "",
    "iIdRegistrationProvider": 1
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "iId": 1,
      "sName": "John Doe",
      "sEmail": "user@example.com",
      "iViewMode": 1,
      "sViewMode": "Dark",
      "iIdLanguage": 1,
      "sLanguage": "English",
      "dWeightKG": 0,
      "dHeightM": 0,
      "iMeasureType": 1,
      "sMeasureType": "Metric",
      "objMemories": "[]",
      "objRoutine": "[]",
      "lastRoutine": null
    },
    "token": {
      "result": "jwt_token_string",
      "expiresIn": 3600
    },
    "refreshToken": {
      "result": "refresh_token_string",
      "expiresIn": 86400
    }
  }
  ```
- **Status Codes**:
  - 200: Successful registration
  - 400: Invalid registration data (e.g., invalid email, phone number format)

#### Refresh Token
- **URL**: `/auth/refreshToken`
- **Method**: POST
- **Requires Auth**: No
- **Description**: Generates a new access token using a refresh token.
- **Request Body**:
  ```json
  {
    "refreshToken": "refresh_token_string"
  }
  ```
- **Response**:
  ```json
  {
    "token": {
      "result": "new_jwt_token_string",
      "expiresIn": 3600
    }
  }
  ```
- **Status Codes**:
  - 201: Successfully generated new token
  - 401: Refresh token required
  - 402: Invalid or expired refresh token

### User Management

#### Update User Information
- **URL**: `/session/user/updateinfo`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Updates basic user information.
- **Request Body**:
  ```json
  {
    "sName": "John Doe",
    "sEmail": "newemail@example.com",
    "sProfilePicture": "profile-url",
    "sPhoneNumber": "1234567890",
    "sLada": "+1"
  }
  ```
- **Response**:
  ```json
  {
    "result": "Info was updated"
  }
  ```
- **Status Codes**:
  - 200: Information updated successfully
  - 401: Update failed

#### Update Additional User Information
- **URL**: `/session/user/updateadditionalinfo`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Updates additional user information and settings.
- **Request Body**:
  ```json
  {
    "iMeasureType": 1,
    "dHeightM": 1.8,
    "dWeightKG": 75.5,
    "sLanguage": "English",
    "iIdLanguage": 1,
    "iViewMode": 1,
    "bSedentaryNotification": true
  }
  ```
- **Response**:
  ```json
  {
    "result": "Info was updated"
  }
  ```
- **Status Codes**:
  - 200: Information updated successfully
  - 401: Update failed

#### Get User Settings
- **URL**: `/session/user/settings`
- **Method**: GET
- **Requires Auth**: Yes
- **Description**: Retrieves the user's current settings.
- **Response**:
  ```json
  {
    "result": {
      "iId": 1,
      "sName": "John Doe",
      "sEmail": "user@example.com",
      "iViewMode": 1,
      "sViewMode": "Dark",
      "iIdLanguage": 1,
      "sLanguage": "English",
      "dWeightKG": 75.5,
      "dHeightM": 1.8,
      "iMeasureType": 1,
      "sMeasureType": "Metric",
      "objMemories": "[{\"iOrder\": 1, \"dHeightInch\": 25.5}, {\"iOrder\": 2, \"dHeightInch\": 30.0}]",
      "objRoutine": "[{\"iId\": 1, \"iIdUser\": 1, \"sRoutineName\": \"Daily Routine\", \"iDurationSeconds\": 1800, \"iStatus\": 1}]",
      "lastRoutine": "{\"iId\": 1, \"iIdUser\": 1, \"iStatus\": 0, \"bCompleteRoutine\": 0, \"iDurationSecondsTarget\": 1800}"
    }
  }
  ```
- **Status Codes**:
  - 201: Settings retrieved successfully

#### Save User Memory
- **URL**: `/session/user/memory`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Saves a user's height memory/preset.
- **Request Body**:
  ```json
  {
    "dHeightInch": 30.5,
    "iOrder": 1
  }
  ```
- **Response**:
  ```json
  {
    "result": "Memory was updated"
  }
  ```
- **Status Codes**:
  - 200: Memory updated successfully
  - 401: Update failed

#### Subscribe Device
- **URL**: `/session/user/suscribe`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Registers a device for notifications.
- **Request Body**:
  ```json
  {
    "sIdProvider": "device_token_for_push_notifications",
    "iIdProvider": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Token successfully registered"
  }
  ```

#### Set Goal
- **URL**: `/session/user/setgoal`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Sets a user's health and usage goals.
- **Request Body**:
  ```json
  {
    "iStandingTimeSeconds": 7200,
    "iSittingTimeSeconds": 14400,
    "iCaloriesToBurn": 500
  }
  ```
- **Response**:
  ```json
  {
    "message": "Set Goal"
  }
  ```

#### Get Goal
- **URL**: `/session/user/getgoal`
- **Method**: GET
- **Requires Auth**: Yes
- **Description**: Retrieves the user's goals.
- **Response**:
  ```json
  {
    "results": [
      {
        "iId": 1,
        "iIdUser": 1,
        "iStandingTimeSeconds": 7200,
        "iSittingTimeSeconds": 14400,
        "iCaloriesToBurn": 500,
        "dtRegistrationDate": "2023-01-01T00:00:00.000Z",
        "dtModificationDate": "2023-01-10T00:00:00.000Z"
      }
    ]
  }
  ```

#### Delete Account
- **URL**: `/session/user/delete`
- **Method**: DELETE
- **Requires Auth**: Yes
- **Description**: Deletes the user's account.
- **Request Body**:
  ```json
  {
    "refreshToken": "refresh_token_string",
    "deleteWord": "last_5_chars_of_refresh_token"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Logged out and deleted successfully."
  }
  ```
- **Status Codes**:
  - 200: Account deleted successfully
  - 201: No active session
  - 400: Token not provided
  - 500: Account not found

#### User Test Connection
- **URL**: `/session/user/test`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Tests if the user is authenticated properly.
- **Response**:
  ```json
  "Now you're connected [User Name]"
  ```
- **Status Codes**:
  - 201: User is connected

### Desk Management

#### Record Desk Movement
- **URL**: `/session/desk/movement`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Records a desk height adjustment movement.
- **Request Body**:
  ```json
  {
    "dHeightInch": 30.5,
    "iOrder": 1,
    "iIdRoutine": 1
  }
  ```
- **Response**:
  ```json
  {
    "result": "Movement was create"
  }
  ```
- **Status Codes**:
  - 200: Movement recorded successfully
  - 401: Failed to record movement

#### Connect to Desk
- **URL**: `/session/desk/conexion`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Establishes connection with a desk device.
- **Request Body**:
  ```json
  {
    "sUUID": "device_uuid_string",
    "iStatus": 1,
    "sDeskName": "My Standing Desk"
  }
  ```
- **Response**:
  ```json
  {
    "result": {
      "sUUID": "device_uuid_string",
      "iStatus": 1,
      "sDeskName": "My Standing Desk"
    }
  }
  ```
- **Status Codes**:
  - 200: Connection established successfully
  - 401: Failed to establish connection

### Routine Management

#### Create/Update Routine
- **URL**: `/session/routine/routine`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Creates or updates a user's routine.
- **Request Body**:
  ```json
  {
    "iDurationSeconds": 1800,
    "iStatus": 1,
    "iSedentarismo": 3600,
    "sRoutineName": "My Daily Routine"
  }
  ```
- **Response**:
  ```json
  {
    "result": {
      "iId": 1,
      "iIdUser": 1,
      "sRoutineName": "My Daily Routine",
      "iDurationSeconds": 1800,
      "dtRegistrationDate": "2023-01-01T00:00:00.000Z",
      "iStatus": 1
    }
  }
  ```
- **Status Codes**:
  - 200: Routine created/updated successfully
  - 401: Failed to create/update routine

#### Get Routines
- **URL**: `/session/routine/routine`
- **Method**: GET
- **Requires Auth**: Yes
- **Description**: Retrieves the user's routines.
- **Response**:
  ```json
  {
    "result": [
      {
        "iId": 1,
        "iIdUser": 1,
        "sRoutineName": "My Daily Routine",
        "iDurationSeconds": 1800,
        "dtRegistrationDate": "2023-01-01T00:00:00.000Z",
        "iStatus": 1
      },
      {
        "iId": 2,
        "iIdUser": 1,
        "sRoutineName": "Afternoon Stretch",
        "iDurationSeconds": 900,
        "dtRegistrationDate": "2023-01-02T00:00:00.000Z",
        "iStatus": 1
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Routines retrieved successfully
  - 401: Failed to retrieve routines

#### Start Routine
- **URL**: `/session/routine/prepared/start`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Starts a user's routine.
- **Request Body**:
  ```json
  {
    "iIdRoutine": 1
  }
  ```
- **Response**:
  ```json
  {
    "result": {
      "iId": 5,
      "iIdUser": 1,
      "iStatus": 1,
      "bCompleteRoutine": 0,
      "iDurationSecondsTarget": 1800,
      "dtStartDate": "2023-01-15T10:00:00.000Z",
      "dtEndDate": "2023-01-15T10:30:00.000Z",
      "dtEndDate_Stop": null
    }
  }
  ```
- **Status Codes**:
  - 200: Routine started successfully
  - 401: Failed to start routine

#### Stop Routine
- **URL**: `/session/routine/prepared/stop`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Stops a user's active routine.
- **Response**:
  ```json
  {
    "result": "The routine stopped"
  }
  ```
- **Status Codes**:
  - 200: Routine stopped successfully

### Reports

#### Get Report
- **URL**: `/session/report/report`
- **Method**: POST
- **Requires Auth**: Yes
- **Description**: Retrieves reports for the user based on a time period.
- **Request Body**:
  ```json
  {
    "sTime": "Today"
  }
  ```
  Valid `sTime` values:
  - "Today"
  - "Week"
  - "Month"
  - "Year"
- **Response**:
  ```json
  {
    "result": {
      "TimeSeatedInSeconds": 14400,
      "TimeStandingInSeconds": 7200,
      "CaloriesBurned": 350,
      "MemoriMoreUse": "Memory 1",
      "iCaloriesToBurn_goal": 500,
      "iSittingTimeSeconds_goal": 14400,
      "iStandingTimeSeconds_goal": 7200
    }
  }
  ```
- **Status Codes**:
  - 200: Report retrieved successfully
  - 401: Failed to retrieve report

### Status

#### Check API Status
- **URL**: `/status/check`
- **Method**: GET
- **Requires Auth**: No
- **Description**: Checks if the API is active based on environment configuration.
- **Response**:
  ```json
  {
    "status": true,
    "message": "Status check passed with true value"
  }
  ```
  Or
  ```json
  {
    "status": false,
    "message": "Status check passed with false value"
  }
  ```
- **Status Codes**:
  - 200: API is active (status = true)
  - 201: API is not active (status = false)

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. When an error occurs, the response will typically include a JSON object with an error message.

Example error responses:

### Validation Error
```json
{
  "error": "Email cannot be empty"
}
```

```json
{
  "error": "Invalid phone number format"
}
```

```json
{
  "error": "Invalid country code format"
}
```

```json
{
  "error": "Both phone number and country code must be provided"
}
```

### Authentication Error
```json
{
  "error": "Password incorrect"
}
```

### Invalid Token Error
```json
{
  "error": "Invalid token"
}
```

### Resource Not Found
```json
{
  "error": "Routine was not found"
}
```

### Internal Server Error
```json
{
  "error": "An unexpected error occurred"
}
```

Common error codes:
- 400: Bad Request - Missing or invalid parameters
- 401: Unauthorized - Authentication failed or insufficient permissions
- 402: Payment Required - When used for token issues
- 404: Route not found - Endpoint doesn't exist
- 500: Internal Server Error - Unexpected server error

## Data Types

### User
```json
{
  "iId": "Integer - User ID",
  "sName": "String - User's name",
  "sEmail": "String - User's email address",
  "sPassword": "String - User's password (hashed, never returned in responses)",
  "sProfilePicture": "String - URL to profile picture",
  "sPhoneNumber": "String - User's phone number",
  "sLada": "String - Country code for phone",
  "iViewMode": "Integer - UI view mode (1=Dark, 2=Light)",
  "sViewMode": "String - UI view mode name",
  "iIdLanguage": "Integer - Language ID",
  "sLanguage": "String - Language name",
  "dWeightKG": "Decimal - User's weight in kg",
  "dHeightM": "Decimal - User's height in meters",
  "iMeasureType": "Integer - Measurement system (1=Metric, 2=Imperial)",
  "sMeasureType": "String - Measurement system name"
}
```

### Desk
```json
{
  "iId": "Integer - Desk ID",
  "iCategory": "Integer - Desk category",
  "sDeskName": "String - Name assigned to the desk",
  "sUUID": "String - Unique device identifier",
  "iStatus": "Integer - Status code (1=Active)",
  "iIdUserLastConnected": "Integer - ID of last connected user"
}
```

### Routine
```json
{
  "iId": "Integer - Routine ID",
  "iIdUser": "Integer - User ID",
  "sRoutineName": "String - Name of the routine",
  "iDurationSeconds": "Integer - Duration in seconds",
  "iSedentarismo": "Integer - Sedentary time threshold in seconds",
  "iStatus": "Integer - Status code (1=Active)"
}
```

### Memory
```json
{
  "iId": "Integer - Memory ID",
  "iIdUser": "Integer - User ID",
  "iOrder": "Integer - Memory position/index",
  "dHeightInch": "Decimal - Height in inches"
}
```

### Goal
```json
{
  "iId": "Integer - Goal ID",
  "iIdUser": "Integer - User ID",
  "iStandingTimeSeconds": "Integer - Target standing time in seconds",
  "iSittingTimeSeconds": "Integer - Target sitting time in seconds",
  "iCaloriesToBurn": "Integer - Target calories to burn"
}
```





CAMBIOS BD:

USE [devGebesaDesks]
GO

/****** Object:  View [usr].[vw_users]    Script Date: 5/14/2025 9:31:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER view [usr].[vw_users]
AS
SELECT 
    u.iId,
	u.sName,
	u.sEmail,
	u.sPhoneNumber,
	u.sLada,
	iViewMode = p3.iValue,
	sViewMode = p3.sValue,
	iIdLanguage = p.iValue,
	sLanguage = p.sValue,
	uai.dWeightKG,
	uai.dHeightM,
	iMeasureType = p2.iValue, 
	sMeasureType = p2.sValue,
	us.bSedentaryNotification,
    objMemories=ISNULL(memories.memories,'[]'),
	objRoutine = ISNULL(utils.firstData(rh.rh),'{}'),
	lastRoutine = ISNULL(utils.firstData(routine.routine),'{}')
FROM 
    usr.users u
LEFT JOIN config.userSettings us on us.iIdUser = u.iId
left join usr.userAdditionalInfo uai on uai.iIdUser = u.iId
left join config.parameters p on p.sKey = 'Language' and p.iValue = ISNULL(us.iIdLanguage,2)
left join config.parameters p2 on p2.sKey = 'MeasureType' and p2.iValue = ISNULL(uai.iMeasureType,1)
left join config.parameters p3 on p3.sKey = 'ViewMode' and p3.iValue = ISNULL(us.iViewMode,1)
OUTER APPLY 
    (SELECT iOrder,dHeightInch
     FROM usr.userMemories um 
     WHERE u.iId = um.iIdUser
     FOR JSON PATH) AS memories(memories)
OUTER APPLY (SELECT iId ,
       iIdUser ,
       iStatus ,
       bCompleteRoutine ,
       iDurationSecondsTarget ,
       dtStartDate ,
       dtEndDate ,
       dtEndDate_Stop 
     FROM  report.routineHistory rh 
     WHERE u.iId = rh.iIdUser AND rh.iStatus = 1
     FOR JSON PATH) AS rh(rh)
OUTER APPLY 
    (SELECT TOP 1 r.iId ,
            r.sRoutineName ,
            r.iDurationSeconds ,
            r.dtRegistrationDate ,
            r.iStatus
     FROM usr.routine r
     WHERE u.iId = r.iIdUser
	 ORDER BY r.dtRegistrationDate DESC
     FOR JSON PATH) AS routine(routine)



GO
