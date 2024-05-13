const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');


router.get('/getSeanceData', teacherController.getSeanceData);
router.post('/createSeance', teacherController.createSeance);
router.put('/updateSeanceStatus', teacherController.updateSeanceStatus);
router.put('/updateSeancePresence', teacherController.updateSeancePresence);
router.delete('/deleteSeance/:idSeance', teacherController.deleteSeance);




module.exports = router;
