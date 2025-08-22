# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GebesaAPI is a Node.js REST API for the GBDESK project - a smart desk management system that tracks height adjustments, user routines, and provides wellness notifications. The API integrates with Firebase for push notifications and uses SQL Server with Always Encrypted for secure data storage.

## Development Commands

```bash
# Start the application
npm start

# Development with file watching
npm run dev

# Install dependencies
npm install
```

## Architecture Overview

The project follows a modular layered architecture with clear separation of concerns:

- **MVC Pattern**: Controllers handle HTTP requests, services contain business logic, models define data structures
- **Singleton Database**: Single connection pool managed through `src/database/SQL/database.js`
- **Socket.IO Integration**: Real-time communication for desk height commands and acknowledgments
- **Firebase Integration**: Push notifications for completed routines and sedentary mode alerts
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Module Aliases**: Path aliases configured in `package.json` for cleaner imports

### Key Components

- **Authentication System**: JWT-based with refresh tokens, bcrypt password hashing
- **Real-time Communication**: Socket.IO for desk commands and status updates
- **Database Layer**: SQL Server with connection pooling and Always Encrypted support
- **Notification System**: Firebase Cloud Messaging for routine and sedentary alerts
- **Scheduled Jobs**: Node-cron for periodic health checks and notifications

## Module Aliases

Use these aliases for imports (configured in `package.json`):
- `@src` → `./src`
- `@config` → `src/config`
- `@controllers` → `src/controllers`
- `@database` → `src/database`
- `@middlewares` → `src/middlewares`
- `@modelsExtras` → `src/modelsExtras`
- `@routes` → `src/routes`
- `@services` → `src/services`
- `@root` → `./`

## Database Architecture

- **Database**: SQL Server with Always Encrypted for sensitive data
- **Connection**: Singleton pattern with connection pooling (1-20 connections)
- **Stored Procedures**: Auto-generated classes in `src/database/SQL/auto/`
- **Models**: Auto-generated model classes for stored procedure results

Key database schemas:
- `desk.*` - Desk management and height commands
- `usr.*` - User management and routines
- `report.*` - Analytics and reporting

## Socket.IO Implementation

- **Real-time Desk Control**: Height adjustment commands sent to Flutter app
- **Room-based Communication**: Clients join rooms by desk UUID
- **Command Acknowledgment**: Apps confirm command completion via `desk:ack` event
- **Database Updates**: ACK events update command status in database

## Configuration Requirements

Essential environment variables (see `.env.example`):
- Database connection (DB_SERVER, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT)
- JWT secrets and expiration times
- Firebase service account path (`fbcm`)
- Token storage path (`tokenpath`)
- Server port (default: 3000)

## Code Conventions

- **Hungarian Notation**: Database-sourced variables use prefixes (`sName`, `iAge`, `arrUsers`)
- **camelCase**: Functions start with verbs (`obtenerUsuario`, `calcularPromedio`)
- **PascalCase**: Classes (`Usuario`, `ReportModel`)
- **Async/Await**: Consistent async pattern throughout
- **Error Handling**: Proper try-catch blocks with database connection cleanup

## Key Services

- **authService**: User authentication and password management
- **jwtService**: Token generation and validation
- **cryptService**: Data encryption/decryption utilities
- **deskService**: Desk connection and movement tracking
- **routineService**: Workout routine management
- **reportService**: Analytics and sedentary mode detection
- **validationService**: Input validation and configuration checks

## Scheduled Jobs

Two cron jobs run every second:
- **Routine Completion Check**: Validates closed routines and sends completion notifications
- **Sedentary Mode Check**: Monitors inactivity and sends wellness reminders

Both jobs use Firebase Cloud Messaging for cross-platform notifications.

## Testing and Database Operations

When working with database operations:
- Use the singleton `database` instance with `.using()` method
- Always handle connection errors gracefully  
- Stored procedures are auto-generated - avoid manual modifications
- Test with actual database connection as SQLite is also available for development