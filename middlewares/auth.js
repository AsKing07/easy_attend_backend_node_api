const admin = require('../config/firebase');

module.exports = (req, res, next) => {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((err) => {
      res.status(401).send('Unauthorized');
    });
};
