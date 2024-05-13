
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const globalController = require('../controllers/globalController');


//Student
router.get('/getStudentByMatricule', globalController.getStudentByMatricule);
router.get('/getStudentById/:id', globalController.getStudentById);
router.get('/getActifStudentData', globalController.getActifStudentData);
router.get('/getStudentData', globalController.getStudentData);


//Prof
router.get('/getActifProfData', globalController.getActifProfData);
router.get('/getInactifProfData', globalController.getInactifProfData);
router.get('/getProfData', globalController.getProfData);
router.get('/getProfById/:id', globalController.getProfById);


//Filiere
router.get('/getFiliereBySigle/:sigle', globalController.getFiliereBySigle);
router.get('/getFiliereByName/:nom', globalController.getFiliereByName);
router.get('/getActifFiliereData', globalController.getActifFiliereData);
router.get('/getInactifFiliereData', globalController.getInactifFiliereData);
router.get('/getFiliereData', globalController.getFiliereData);
router.get('/getFiliereById/:id', globalController.getFiliereById);

//Cours
router.get("/getCourseBySigle/:sigle", globalController.getCourseBySigle);
router.get("/getCourseById/:id", globalController.getCourseById);
router.get('/getActifCoursesData', globalController.getActifCoursesData);
router.get('/getCoursesData', globalController.getCoursesData);

//Requete .createRequest

router.post('/createRequest', globalController.createRequest);
router.get('/getRequestData', globalController.getRequestData);
router.get('/getUnsolvedRequestData', globalController.getUnsolvedRequestData);
router.get('/getRequestById/:id', globalController.getRequestById);





module.exports = router;