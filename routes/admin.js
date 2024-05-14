const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/createAdmin', adminController.createAdmin);
router.get('/:uid', adminController.getAdmin);



module.exports = router;