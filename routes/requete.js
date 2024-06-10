
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const requeteController = require('../controllers/requeteController');



router.post('/', requeteController.createRequest);
router.get('/getRequestData', requeteController.getRequestData);
router.get('/getUnsolvedRequestData', requeteController.getUnsolvedRequestData);
router.get('/:id', requeteController.getRequestByUserId);
router.delete('/:id', requeteController.deleteRequestById);
router.put('/updateRequestStatus', requeteController.updateRequesteStatus);

module.exports = router;