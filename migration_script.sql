IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    CREATE TABLE [Vehicles] (
        [VehicleID] int NOT NULL IDENTITY,
        [Type] int NOT NULL,
        [PassangerCapacity] int NOT NULL,
        [PricePerKilometer] decimal(18,2) NOT NULL,
        [Discriminator] nvarchar(max) NOT NULL,
        [HasFreeFood] bit NULL,
        [OffersWaterSports] bit NULL,
        [Carts] int NULL,
        CONSTRAINT [PK_Vehicles] PRIMARY KEY ([VehicleID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    CREATE TABLE [Journeys] (
        [JourneyID] uniqueidentifier NOT NULL,
        [Destination] nvarchar(max) NOT NULL,
        [StartLocation] nvarchar(max) NOT NULL,
        [Distance] int NOT NULL,
        [VehicleID] int NOT NULL,
        CONSTRAINT [PK_Journeys] PRIMARY KEY ([JourneyID]),
        CONSTRAINT [FK_Journeys_Vehicles_VehicleID] FOREIGN KEY ([VehicleID]) REFERENCES [Vehicles] ([VehicleID]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    CREATE TABLE [Tickets] (
        [TicketID] uniqueidentifier NOT NULL,
        [AdministrativeCosts] decimal(18,2) NOT NULL,
        [JourneyID] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Tickets] PRIMARY KEY ([TicketID]),
        CONSTRAINT [FK_Tickets_Journeys_JourneyID] FOREIGN KEY ([JourneyID]) REFERENCES [Journeys] ([JourneyID]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    CREATE INDEX [IX_Journeys_VehicleID] ON [Journeys] ([VehicleID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    CREATE INDEX [IX_Tickets_JourneyID] ON [Tickets] ([JourneyID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220901082818_init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220901082818_init', N'6.0.8');
END;
GO

COMMIT;
GO

