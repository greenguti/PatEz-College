DROP TABLE IF EXISTS `classes`;
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `majors`;
DROP TABLE IF EXISTS `professors`;
DROP TABLE IF EXISTS `students`;

--Creates classes table 
CREATE TABLE `classes`{
	`courseID` INT(11) NOT NULL,
	`coursename` VARCHAR(255) NOT NULL,
	`courseCap` INT(11) NOT NULL,
	`courseLoc` VARCHAR(255) NOT NULL,
	`majorID` INT(11) NOT NULL,
	PRIMARY KEY(`courseID`)
	FOREIGN KEY(`majorID`)
	REFERENCES `collegeOf`(`majorID`)
	ON UPDATE CASCADE
	ON DELETE CASCADE

};

--Creates the enrollement table 
CREATE TABLE `enrollments`{
	`courseID` INT(11) NOT NULL,
	`studentID` INT(11) NOT NULL,
	PRIMARY KEY(`courseID`,`studentID`)
};

-- Creates the major tables 
CREATE TABLE `majors`{
	`majorID` INT(11) NOT NULL,
	`majorname` VARCHAR(255) NOT NULL,
	`collegename` VARCHAR(255) NOT NULL,
	`undergradute` boolean not null default 0,
	PRIMARY KEY(`majorID`,`majorname`,`collegename`)
};

-- Creates the professors tables 
CREATE TABLE `professors`{
	`employeeID` INT(11) NOT NULL,
	`Fname` VARCHAR(255) NOT NULL,
	`Lname` VARCHAR(255) NOT NULL,
	`collegename` VARCHAR(255) NOT NULL,
	`tenured` boolean not null default 0,
	PRIMARY KEY(`Fname`,`Lname`)
	FOREIGN KEY(`collegename`)
	REFERENCES `cName`(`collegename`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
};

-- Creates the students tables 
CREATE TABLE `students`{
	`studentID` INT(11) NOT NULL,
	`Fname` VARCHAR(255) NOT NULL,
	`Lname` VARCHAR(255) NOT NULL,
	`gpa` INT(11) NOT NULL,
	`majorname` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`Fname`,`Lname`,`majorname`)
	FOREIGN KEY(`studentID`)
	REFERENCES `SID`(`studentID`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
	FOREIGN KEY(`majorname`)
	REFERENCES `mName`(`majorname`)
	ON UPDATE CASCADE
	ON DELETE CASCADE
};

