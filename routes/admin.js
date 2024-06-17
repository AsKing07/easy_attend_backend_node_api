const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../config/uploadConfig');

router.post('/createAdmin', adminController.createAdmin);
router.post('/updatePhoto/:userId', upload.single('image'), adminController.updatePhoto);

router.get('/:uid', adminController.getAdmin);



module.exports = router;