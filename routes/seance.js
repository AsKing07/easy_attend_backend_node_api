const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const seanceController = require('../controllers/seanceController');


router.get('/getSeanceData', seanceController.getSeanceData);
router.get('/getSeanceByCode/:code', seanceController.getSeanceByCode);
router.post('/', seanceController.createSeance);
router.put('/updateSeanceStatus', seanceController.updateSeanceStatus);
router.put('/updateSeancePresence', seanceController.updateSeancePresence);
router.delete('/:idSeance', seanceController.deleteSeance);




module.exports = router;
