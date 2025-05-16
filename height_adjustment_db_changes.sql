-- Database changes required for the height adjustment feature
-- This script should be executed on the devGebesaDesks database

USE [devGebesaDesks]
GO

/****** Create table to store height adjustment history ******/
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[desk].[heightAdjustments]') AND type in (N'U'))
BEGIN
    CREATE TABLE [desk].[heightAdjustments](
        [iId] [int] IDENTITY(1,1) NOT NULL,
        [iIdUser] [int] NOT NULL,
        [sUUID] [nvarchar](100) NOT NULL,
        [dTargetHeight] [decimal](18, 6) NOT NULL,
        [iMemoryPosition] [int] NULL,
        [iStatus] [int] NOT NULL DEFAULT(1),
        [dtRegistrationDate] [datetime] NOT NULL DEFAULT(getdate()),
        
        CONSTRAINT [PK_heightAdjustments] PRIMARY KEY CLUSTERED 
        (
            [iId] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]

    -- Add foreign key constraint to users table
    ALTER TABLE [desk].[heightAdjustments] WITH CHECK ADD CONSTRAINT [FK_heightAdjustments_users] 
    FOREIGN KEY([iIdUser]) REFERENCES [usr].[users] ([iId])
END
GO

/****** Create stored procedure for height adjustment ******/
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[desk].[SP_AdjustHeight]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [desk].[SP_AdjustHeight]
GO

CREATE PROCEDURE [desk].[SP_AdjustHeight]
    @iIdUser INT,
    @sUUID NVARCHAR(100),
    @dTargetHeight DECIMAL(18, 6),
    @iMemoryPosition INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @deskExists INT = 0
    
    -- Check if the desk exists and is connected to this user
    SELECT @deskExists = COUNT(*) 
    FROM [desk].[desks] d
    JOIN [desk].[userDeskHistory] udh ON d.iId = udh.iIdDesks
    WHERE d.sUUID = @sUUID AND udh.iIdUser = @iIdUser
    
    -- If desk doesn't exist or is not connected to this user
    IF @deskExists = 0
    BEGIN
        SELECT 0 AS Result, 'Desk not found or not connected to this user' AS Message
        RETURN
    END
    
    -- Save the height adjustment request
    INSERT INTO [desk].[heightAdjustments]
        ([iIdUser], [sUUID], [dTargetHeight], [iMemoryPosition])
    VALUES
        (@iIdUser, @sUUID, @dTargetHeight, @iMemoryPosition)
    
    -- If memory position is provided, also save it to user memories
    IF @iMemoryPosition IS NOT NULL
    BEGIN
        -- Check if memory position already exists
        IF EXISTS (SELECT 1 FROM [usr].[userMemories] WHERE iIdUser = @iIdUser AND iOrder = @iMemoryPosition)
        BEGIN
            -- Update existing memory
            UPDATE [usr].[userMemories]
            SET dHeightInch = @dTargetHeight
            WHERE iIdUser = @iIdUser AND iOrder = @iMemoryPosition
        END
        ELSE
        BEGIN
            -- Insert new memory
            INSERT INTO [usr].[userMemories]
                ([iIdUser], [iOrder], [dHeightInch])
            VALUES
                (@iIdUser, @iMemoryPosition, @dTargetHeight)
        END
    END
    
    -- Create movement history
    INSERT INTO [report].[userMovementHistory]
        ([iIdUserDeskHistory], [dHeightInch], [iOrder], [iIdRoutine])
    SELECT 
        udh.iId, 
        @dTargetHeight, 
        ISNULL(@iMemoryPosition, 0), 
        NULL 
    FROM [desk].[userDeskHistory] udh
    JOIN [desk].[desks] d ON udh.iIdDesks = d.iId
    WHERE d.sUUID = @sUUID AND udh.iIdUser = @iIdUser
    
    -- Return success response
    SELECT 
        1 AS Result, 
        'Height adjustment initiated' AS Message,
        @dTargetHeight AS TargetHeight,
        @sUUID AS DeskUUID,
        @iMemoryPosition AS MemoryPosition
    
END
GO

-- Grant execute permission to the service account
GRANT EXECUTE ON [desk].[SP_AdjustHeight] TO [GebesaAPI]
GO