
CREATE DATABASE PoliceRegistrationSystem;
GO

USE PoliceRegistrationSystem;
GO

CREATE TABLE Users
(
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100) NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Role VARCHAR(20) NOT NULL
        CHECK (Role IN ('Admin','User'))
);

CREATE TABLE Citizens (
    CitizenID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100) NOT NULL,
    Gender VARCHAR(10),
    DateOfBirth DATE,
    Address VARCHAR(200),
    Phone VARCHAR(20)
);



CREATE TABLE Officers (
    OfficerID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100) NOT NULL,
    RankName VARCHAR(50),
    Phone VARCHAR(20)
);




CREATE TABLE Registrations (
    RegistrationID INT PRIMARY KEY IDENTITY(1,1),
    CitizenID INT NOT NULL,
    OfficerID INT NOT NULL,
    RegistrationDate DATE,

    FOREIGN KEY (CitizenID)
        REFERENCES Citizens(CitizenID),

    FOREIGN KEY (OfficerID)
        REFERENCES Officers(OfficerID)
);


INSERT INTO Users
(FullName, Username, Password, Role)
VALUES
('System Administrator', 'admin', 'admin123', 'Admin'),
('Ahmed Ali', 'ahmed', '123456', 'User'),
('Amina Hassan', 'amina', '123456', 'User');

Insert into Citizens
(FullName, Gender, DateOfBirth, Address, Phone)
Values
('Ahmed Ali', 'Male', '1998-05-12', 'Mogadishu', '615123456'),
('Amina Hassan', 'Female', '2000-08-20', 'Hargeisa', '618987654');

Insert into Officers
(FullName, RankName, Phone)
Values
('Mohamed Nur', 'Captain', '615555111'),
('Abdi Yusuf', 'Lieutenant', '615555222');

Insert into Registrations
(CitizenID, OfficerID, RegistrationDate)
Values
(1, 1, '2026-06-17'),
(2, 2, '2026-06-18');


SELECT * FROM Users;
SELECT * FROM Citizens;
SELECT * FROM Officers;
SELECT * FROM Registrations;