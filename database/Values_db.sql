
-- Add file CSDL vào MYSQL

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'string', 'string', 'string', 'user', '2024-08-29 15:11:41', '2024-08-29 15:11:41'),
(2, 'string', 'string', 'string', 'user', '2024-08-30 02:42:12', '2024-08-30 02:42:12');

--
-- Đang đổ dữ liệu cho bảng `subject`
--

-- -- Insert data into `courses` table
INSERT INTO `courses` (`title`, `description`, `createdAt`, `updatedAt`) 
VALUES 
('Introduction to Programming', 'Learn the basics of programming.', NOW(), NOW()),
('Advanced Databases', 'Deep dive into database management and optimization.', NOW(), NOW());

-- -- Insert data into `exercises` table
INSERT INTO `exercises` (`title`, `description`, `difficulty`, `courseId`, `createdAt`, `updatedAt`) 
VALUES 
('Hello World Exercise', 'Write your first program.', 'Easy', 1, NOW(), NOW()),
('Database Indexing', 'Optimize queries using indexing.', 'Hard', 2, NOW(), NOW());

-- -- Insert data into `process` table
INSERT INTO `process` (`userId`, `exerciseId`, `status`, `completeAt`) 
VALUES 
(1, 1, 'completed', NOW()),
(2, 2, 'in-progress', NULL);

-- -- Insert data into `enrollments` table
INSERT INTO `enrollments` (`userId`, `courseId`, `createdAt`, `updatedAt`) 
VALUES 
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW());
