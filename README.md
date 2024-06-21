# EasyAttend Project

This project is a user and data management application for an online attendance platform.

## Technologies Used
- Node.js
- Express.js
- MySQL
- Amazon S3
- Firebase

## Backend for Attendance Management App

This repository contains the backend code for an attendance management application. For the frontend repository, please visit [EasyAttend FrontEnd](https://github.com/AsKing07/easy_attend).

## Configuration

Before starting, make sure to configure the following:

1. **Database**: Ensure you have a MySQL database set up with the correct access information. Configuration details can be found in config/db.js
2. **Image Storage**: Images for professors, students, and administrators are stored on Amazon S3. Configure access keys and bucket name in config/uploadConfig.js

## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the application using `npm start`.

## Features

1. **Professors Management**: Create, update, delete, and retrieve professors.
2. **Students Management**: Create, update, delete, and retrieve students.
3. **Administrators Management**: Create, update, delete, and retrieve administrators.
4. **Courses Management**: Update information on courses.
5. **Sessions Management**: Update session status and manage attendance.
6. **Query Management**: Manage Student's queries 

Feel free to explore the various controllers and routes for more details on the implemented features.

---

