const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');



router.delete('/', coursController.deleteAllCourses);
router.post('/', coursController.createCourse);
router.put('/', coursController.updateCourseById);
router.delete('/:id', coursController.deleteCourseById);
router.delete('/deleteCoursesByFiliere/:filiereId', coursController.deleteCoursesByFiliere);
router.put('/restaureCoursesByFiliere/:filiereId', coursController.restaureCoursesByFiliere);



router.get("/getCourseBySigle/:sigle", coursController.getCourseBySigle);
router.get("/getCourseById/:id", coursController.getCourseById);
router.get('/getActifCoursesData', coursController.getActifCoursesData);
router.get('/getCoursesData', coursController.getCoursesData);


module.exports = router;