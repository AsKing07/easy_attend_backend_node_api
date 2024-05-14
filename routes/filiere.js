const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const filiereController = require('../controllers/filiereController');


// Methodes CRUD
router.post("/", filiereController.createFiliere);
router.put("/", filiereController.updateFiliereById);
router.delete('/', filiereController.deleteAllFilieres);
router.delete('/:id', filiereController.deleteFiliereById);
router.put('/:id', filiereController.restaureFiliereById);

//Methodes read

router.get('/getFiliereBySigle/:sigle', filiereController.getFiliereBySigle);
router.get('/getFiliereByName/:nom', filiereController.getFiliereByName);
router.get('/getActifFiliereData', filiereController.getActifFiliereData);
router.get('/getInactifFiliereData', filiereController.getInactifFiliereData);
router.get('/getFiliereData', filiereController.getFiliereData);
router.get('/getFiliereById/:id', filiereController.getFiliereById);

module.exports = router;