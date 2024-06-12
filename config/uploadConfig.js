// uploadConfig.js
const multer = require('multer');
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');



aws.config.update({
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region:process.env.AWS_REGION || "us-east-1"
});

const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 3 } // Limite de 3MB
});

module.exports = upload;