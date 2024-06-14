const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const profController = require('../controllers/profController');
const upload = require('../config/uploadConfig');



router.post("/", profController.createProf);
router.post('/updatePhoto/:userId', upload.single('image'), profController.updatePhoto);
router.delete('/', profController.deleteAllProfs);
router.delete('/:id', profController.deleteProfById);
router.put('/:id', profController.restaureProfById);
router.put('/', profController.updateProfById);


router.get('/getActifProfData', profController.getActifProfData);
router.get('/getInactifProfData', profController.getInactifProfData);
router.get('/getProfData', profController.getProfData);
router.get('/getProfById/:id', profController.getProfById);
router.get('/:id', profController.getProfById);


module.exports = router;