const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const profController = require('../controllers/profController');


router.post("/", profController.createProf);
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