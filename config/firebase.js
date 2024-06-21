const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require(`${process.env.SERVICE_ACCOUNT}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;
