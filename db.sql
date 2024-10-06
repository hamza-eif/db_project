use fast_connect;
-- Table for Programs
CREATE TABLE tbl_programs (
    prog_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
INSERT INTO tbl_programs (name) VALUES 
('BS'), 
('MS');

-- Table for Departments
CREATE TABLE tbl_dec (
    dec_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
INSERT INTO tbl_dec (name) VALUES 
('CS'), 
('SE'), 
('CE');

-- tbl_dec_of_program:
CREATE TABLE tbl_dec_of_program (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT,
    dec_id INT,
    description VARCHAR(255),
    FOREIGN KEY (program_id) REFERENCES tbl_programs(prog_id),
    FOREIGN KEY (dec_id) REFERENCES tbl_dec(dec_id)
);

INSERT INTO tbl_dec_of_program (program_id, dec_id, description) VALUES
(1, 1, 'Computer Science'),
(1, 2, 'Software Engineering'),
(2, 3, 'Civil Engineering'),
(2, 1, 'Computer Science'),
(2, 2, 'Software Engineering');
-- getting all dec of specific program 
SELECT l.dec_id, l.name, r.description
FROM tbl_dec l
INNER JOIN tbl_dec_of_program r
ON l.dec_id = r.dec_id
WHERE r.program_id = 1;  -- Assuming 1 is the program_id for MS

-- Table for Semesters
CREATE TABLE tbl_sem (
    sem_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
INSERT INTO tbl_sem (name) VALUES 
('1st Sem'), 
('2nd Sem'), 
('3rd Sem'), 
('4th Sem'), 
('5th Sem'), 
('6th Sem'), 
('7th Sem'), 
('8th Sem');


-- Table for Sections
CREATE TABLE tbl_sections (
    sec_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);
INSERT INTO tbl_sections (name) VALUES 
('A'), 
('B'), 
('C'), 
('D'), 
('E'), 
('F');

-- Table for Students
CREATE TABLE tbl_student (
    student_id VARCHAR(8) PRIMARY KEY,
    student_email VARCHAR(100) NOT NULL UNIQUE,
    student_name varchar(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    prog_id INT,
    dec_id INT,
    sem_id INT,
    sec_id INT,
    FOREIGN KEY (prog_id) REFERENCES tbl_programs(prog_id),
    FOREIGN KEY (dec_id) REFERENCES tbl_dec(dec_id),
    FOREIGN KEY (sem_id) REFERENCES tbl_sem(sem_id),
    FOREIGN KEY (sec_id) REFERENCES tbl_sections(sec_id)
);
INSERT INTO tbl_student (student_id, student_email,student_name, password, prog_id, dec_id, sem_id, sec_id) VALUES 
('22k-4647', 'hamza@example.com', "Hamza",'hashed_password_1', 1, 1, 4, 1),  -- BSCS 4th Sem Section A
('22k-4648', 'ali@example.com',"Ahmed" ,'hashed_password_2', 2, 2, 4, 2);  -- MSCS 4th Sem Section B

CREATE TABLE tbl_teacher (
    teacher_id INT auto_increment primary key,
    teacher_name varchar(225) NOT NULL,
    teacher_email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
-- Insert data into updated tbl_teacher
INSERT INTO tbl_teacher (teacher_name, teacher_email, password) VALUES 
('Dr. Smith', 'smith@example.com', 'hashed_password_3'),
('Prof. Johnson', 'johnson@example.com', 'hashed_password_4');



CREATE TABLE tbl_sec_for_teacher(
	section_id INT auto_increment primary key,
    teacher_email_from_tbl_teacher VARCHAR(100) NOT NULL,
    prog_id INT,
    dec_id INT,
    sem_id INT,
    sec_id INT,
     FOREIGN KEY (teacher_email_from_tbl_teacher) REFERENCES tbl_teacher(teacher_email),
    FOREIGN KEY (prog_id) REFERENCES tbl_programs(prog_id),
    FOREIGN KEY (dec_id) REFERENCES tbl_dec(dec_id),
    FOREIGN KEY (sem_id) REFERENCES tbl_sem(sem_id),
    FOREIGN KEY (sec_id) REFERENCES tbl_sections(sec_id)
);

INSERT INTO tbl_sec_for_teacher (teacher_email_from_tbl_teacher, prog_id, dec_id, sem_id, sec_id) VALUES 
('smith@example.com',1 , 1, 4, 1),  -- Dr. Smith teaches BSCS Section A in 4th Sem
('smith@example.com', 1, 2, 4, 2),  -- Dr. Smith teaches MSCS Section B in 4th Sem
('johnson@example.com', 1, 1, 4, 3);  -- Prof. Johnson teaches BSCS Section C in 4th Sem
-- for notifications: 
CREATE TABLE tbl_notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT, -- who sent 
    message TEXT NOT NULL,
    room_no varchar(4) not null,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- for which student group 
    prog_id INT,
    dec_id INT,
    sem_id INT,
    sec_id INT,
    FOREIGN KEY (teacher_id) REFERENCES tbl_teacher(teacher_id),
    FOREIGN KEY (prog_id) REFERENCES tbl_programs(prog_id),
    FOREIGN KEY (dec_id) REFERENCES tbl_dec(dec_id),
    FOREIGN KEY (sem_id) REFERENCES tbl_sem(sem_id),
    FOREIGN KEY (sec_id) REFERENCES tbl_sections(sec_id)
);


