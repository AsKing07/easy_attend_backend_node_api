const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('../config/easyattend-bc902-firebase-adminsdk-dy371-e4f5929be8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;
