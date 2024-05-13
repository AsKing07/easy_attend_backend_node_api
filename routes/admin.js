const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/createAdmin', adminController.createAdmin);
router.get('/:uid', adminController.getAdmin);

//Prof
router.post("/prof", adminController.createProf);
router.delete('/prof', adminController.deleteAllProfs);
router.delete('/prof/:id', adminController.deleteProfById);
router.put('/prof/:id', adminController.restaureProfById);
router.put('/prof', adminController.updateProfById);




//Student
router.post("/students", adminController.createStudent);
router.delete('/students', adminController.deleteAllStudents);
router.delete('/students/:id', adminController.deleteStudentById);
router.delete('/deleteStudentsByFiliere/:filiereId', adminController.deleteStudentsByFiliere);
router.get('/restaureStudentsByFiliere/:filiereId', adminController.restaureStudentsByFiliere);
router.put('/students/:id', adminController.restaureStudentById);
router.put('/students', adminController.updateStudentById);


//Filiere
router.post("/filiere", adminController.createFiliere);
router.put("/filiere", adminController.updateFiliereById);
router.delete('/filiere', adminController.deleteAllFilieres);
router.delete('/filiere/:id', adminController.deleteFiliereById);
router.put('/filiere/:id', adminController.restaureFiliereById);

//Cours
router.delete('/courses', adminController.deleteAllCourses);
router.post('/courses', adminController.createCourse);
router.put('/courses', adminController.updateCourseById);
router.delete('/courses/:id', adminController.deleteCourseById);
router.delete('/deleteCoursesByFiliere/:filiereId', adminController.deleteCoursesByFiliere);
router.get('/restaureCoursesByFiliere/:filiereId', adminController.restaureCoursesByFiliere);


//Requêtes 
router.put('/updateRequestStatus', adminController.updateRequesteStatus);





module.exports = router;