-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

-- Queries for /students
INSERT INTO Students (first_name, last_name, gpa, major_id) 
VALUES (:first_name_input, :last_name_input, :gpa_input, 
(SELECT major_id FROM Majors Where name= :major_name_input));

SELECT Students.student_id, Students.first_name, Students.last_name, Students.gpa, Majors.name AS major
FROM Students JOIN Majors ON Students.major_id = Majors.major_id 
WHERE first_name= :first_name_input AND last_name=:last_name_input;
ORDER BY Students.last_name;

-- Queries for /professors
INSERT INTO Professors (first_name, last_name, college, tenured) 
VALUES (:first_name_input, :last_name_input, :college_input, 
:tenured_yes=1_no=0); 

SELECT * FROM Professors WHERE first_name= :first_name_input AND last_name=:last_name_input
ORDER BY last_name;

-- Queries for /classes
INSERT INTO Classes (name, capacity, location, major, employee_id)
VALUES (:name_input, :capacity_input, :location_input, 
(SELECT major_id FROM Majors WHERE name= :major_name_input),
(SELECT employee_id from Professors WHERE first_name=:first_name_input AND last_name=:last_name_input));

SELECT Classes.class_id, Classes.name, Classes.capacity, Classes.location, Majors.name AS major, Professors.last_name AS Professor
FROM Classes JOIN Majors on Classes.major_id = Majors.Major_id JOIN Professors on Classes.employee_id = Professors.employee_id 
WHERE Classes.name=:search_name_input
ORDER BY CLasses.name;

-- Queries for /majors
INSERT INTO Majors (name, college, undergraduate) 
VALUES (:name_input, :college_input, _undergraduate_input_yes=1_no=0);

SELECT * FROM Majors WHERE name=:name_input
ORDER BY name;

-- Queries for /enrollments
INSERT INTO Enrollments (class_id, student_id, grade) 
VALUES ((SELECT class_id FROM Classes WHERE name=:name_input), :student_id_input, :grade_input);


-- Search by Class Name
SELECT Enrollments.student_id, CONCAT(Students.last_name,', ',Students.first_name) AS student_name,
Enrollments.class_id, Classes.name as class_name, Enrollments.grade FROM Enrollments 
JOIN Students ON Enrollments.student_id = Students.student_id 
JOIN Classes ON Enrollments.class_id = Classes.class_id 
WHERE Classes.name = :class_name_input;
ORDER BY student_name;


-- Search by student_id
SELECT Enrollments.student_id, CONCAT(Students.first_name,' ',Students.last_name) AS student_name,
Enrollments.class_id, Classes.name as class_name, Enrollments.grade FROM Enrollments 
JOIN Students ON Enrollments.student_id = Students.student_id 
JOIN Classes ON Enrollments.class_id = Classes.class_id 
WHERE Students.student_id = :student_id_input
ORDER BY Classes.name;

-- Delete enrollment
DELETE FROM Enrollments WHERE class_id=:class_id_input AND student_id=:student_id_input;

-- Update grade
UPDATE Enrollments SET grade = :grade_input WHERE class_id= :class_id_input AND student_id = student_id_input;