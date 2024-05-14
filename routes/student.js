const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');



//Student
router.post("/", studentController.createStudent);
router.delete('/', studentController.deleteAllStudents);
router.delete('/:id', studentController.deleteStudentById);
router.delete('/deleteStudentsByFiliere/:filiereId', studentController.deleteStudentsByFiliere);
router.put('/restaureStudentsByFiliere/:filiereId', studentController.restaureStudentsByFiliere);
router.put('/:id', studentController.restaureStudentById);
router.put('/', studentController.updateStudentById);


router.get('/getStudentByMatricule', studentController.getStudentByMatricule);
router.get('/getStudentById/:id', studentController.getStudentById);
router.get('/getActifStudentData', studentController.getActifStudentData);
router.get('/getInactifStudentData', studentController.getInactifStudentData);
router.get('/getStudentData', studentController.getStudentData);
router.get('/:id', studentController.getStudentById);


module.exports = router;