// const db = require('../config/db');
const pool = require('../config/db');
const upload = require('../config/uploadConfig');
const aws = require('aws-sdk');
const s3 = new aws.S3();

// exports.createAdmin = (req, res) => {
//   const { uid, email, nom, prenom, phone } = req.body;
//   console.log(req.body);
//   // Vérifier si l'utilisateur existe déjà dans la base de données SQL
//   const sql = 'SELECT * FROM admin WHERE uid = ?';
//   db.query(sql, [uid], (err, result) => {
//     if (err) throw err;
//     if (result.length > 0) {
//       // L'utilisateur existe déjà dans la base de données SQL
//       res.send('Asmin already exists in SQL database');
//     } else {
//       // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
//       const sql = 'INSERT INTO admin (uid, email, nom, prenom, phone) VALUES (?, ?, ?, ?, ?)';
//       db.query(sql, [uid, email, nom, prenom, phone], (err, result) => {
//         if (err) 
//           {
//             res.status(500).send(`${err.message}`);
//           }
//           else
//           {
//             res.send('Admin added to SQL database');
//           }         
//       });
//     }
//   });
// };

exports.createAdmin = (req, res) => {
  const { uid, email, nom, prenom, phone } = req.body;
  console.log(req.body);

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Error getting connection from pool');
      }

      // Vérifier si l'utilisateur existe déjà dans la base de données SQL
      const sql = 'SELECT * FROM admin WHERE uid = ?';
      connection.query(sql, [uid], (err, result) => {
          if (err) {
              connection.release();
              return res.status(500).send(err);
          }

          if (result.length > 0) {
              // L'utilisateur existe déjà dans la base de données SQL
              connection.release();
              res.send('Admin already exists in SQL database');
          } else {
              // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
              const sql = 'INSERT INTO admin (uid, email, nom, prenom, phone) VALUES (?, ?, ?, ?, ?)';
              connection.query(sql, [uid, email, nom, prenom, phone], (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send(err);
                  } else {
                      res.send('Admin added to SQL database');
                  }
              });
          }
      });
  });
};

//Update profile image
exports.updatePhoto = (req, res) => {
    const userId = req.params.userId;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    


    // Get the old image key to delete it from S3 if necessary
    pool.query('SELECT image FROM admin WHERE uid = ?', [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user image');
        }

        const oldImageKey = results[0].image ? results[0].image.split('/').pop() : null;

        // Update user with new image URL
        const imageUrl = file.location;
        console.log(imageUrl);
        console.log(userId);
        pool.query('UPDATE admin SET image = ? WHERE uid = ?', [imageUrl, userId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error updating user image');
            }

            // Delete old image from S3
            if (oldImageKey) {
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: oldImageKey
                };

                s3.deleteObject(params, (err, data) => {
                    if (err) {
                        console.error('Error deleting old image from S3:', err);
                    }
                });
            }

            res.send({ message: 'Image updated successfully', imageUrl: imageUrl });
        });
    });
};

// exports.getAdmin = (req, res) => {
//     const { uid } = req.params;
//   console.log(req.params)
//     // Vérifier si l'utilisateur existe dans la base de données SQL
//     const sql = 'SELECT * FROM admin WHERE uid = ?';
//     db.query(sql, [uid], (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       }; 
//       if (result.length > 0) {
//         // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
//         res.send(result[0]);
//       } else {
//         // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
//         res.status(404).send('User not found in SQL database');       
//       }
//     });
//   };
  exports.getAdmin = (req, res) => {
    const { uid } = req.params;
    console.log(req.params);

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Error getting connection from pool');
        }

        // Vérifier si l'utilisateur existe dans la base de données SQL
        const sql = 'SELECT * FROM admin WHERE uid = ?';
        connection.query(sql, [uid], (err, result) => {
            connection.release();
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
                res.send(result[0]);
            } else {
                // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
                res.status(404).send('User not found in SQL database');
            }
        });
    });
};
