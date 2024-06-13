// const db = require('../config/db');
const pool = require('../config/db');
const upload = require('../config/uploadConfig');
const aws = require('aws-sdk');
const s3 = new aws.S3();

//Creer un étudiant
// exports.createStudent = (req, res) => {
//     const { uid, email, nom, prenom, phone,matricule, idFiliere, filiere, niveau } = req.body;
//     console.log(req.body);
  
//     // Vérifier si l'utilisateur existe déjà dans la base de données SQL
//     const sql = 'SELECT * FROM student WHERE uid = ?';
//     db.query(sql, [uid], (err, result) => {
//       if (err) throw err;
  
//       if (result.length > 0) {
//         // L'utilisateur existe déjà dans la base de données SQL
//         res.send('Student already exists in SQL database');
//       } else {
//         // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
//         const sql = 'INSERT INTO student (uid, email, nom, prenom, phone, statut, matricule, idFiliere, filiere, niveau) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//         db.query(sql, [uid, email, nom, prenom, phone, true, matricule, idFiliere,filiere, niveau], (err, result) => {
//           if (err) throw err;
//           res.send('Student added to SQL database');
//         });
//       }
//     });
//   };
  exports.createStudent = (req, res) => {
    const { uid, email, nom, prenom, phone, matricule, idFiliere, filiere, niveau } = req.body;

    const sqlCheck = 'SELECT * FROM student WHERE uid = ?';
    pool.query(sqlCheck, [uid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la création de l\'étudiant');
        }

        if (result.length > 0) {
            return res.send('Student already exists in SQL database');
        }

        const sqlInsert = 'INSERT INTO student (uid, email, nom, prenom, phone, statut, matricule, idFiliere, filiere, niveau) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        pool.query(sqlInsert, [uid, email, nom, prenom, phone, true, matricule, idFiliere, filiere, niveau], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la création de l\'étudiant');
            }
            res.send('Student added to SQL database');
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
    pool.query('SELECT image FROM student WHERE uid = ?', [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user image');
        }

        const oldImageKey = results[0].image ? results[0].image.split('/').pop() : null;

        // Update user with new image URL
        const imageUrl = file.location;
        console.log(imageUrl);
        console.log(userId);
        pool.query('UPDATE student SET image = ? WHERE uid = ?', [imageUrl, userId], (err, results) => {
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

  //Modifier Etudiant
  // exports.updateStudentById = (req, res) => {
  //   const {uid, nom, prenom, phone, matricule, filiere, idFiliere, niveau } = req.body;
   
  //   const sqlQuery = 'UPDATE student SET nom = ?, prenom = ?, phone = ?, matricule = ?, filiere = ?, idFiliere = ?, niveau = ? WHERE uid = ? ';
  //   db.query(sqlQuery, [nom, prenom, phone, matricule, filiere, idFiliere, niveau, uid], (err, result) =>{
  //     console.log(sqlQuery);

  //     if (err)
  //     {
  //       res.status(500).send("");
  //       console.log(err);

  //     }
  //     else
  //     {
  //       res.status(200).send('Etudiant modifiée avec succès');

  //     }

  //   });
  // }
  exports.updateStudentById = (req, res) => {
    const { uid, nom, prenom, phone, matricule, filiere, idFiliere, niveau } = req.body;

    const sqlQuery = 'UPDATE student SET nom = ?, prenom = ?, phone = ?, matricule = ?, filiere = ?, idFiliere = ?, niveau = ? WHERE uid = ?';
    pool.query(sqlQuery, [nom, prenom, phone, matricule, filiere, idFiliere, niveau, uid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la modification de l\'étudiant');
        }
        res.status(200).send('Etudiant modifiée avec succès');
    });
};


   //Supprimer tous les étudiants
  //  exports.deleteAllStudents = (req, res) =>
  //  {
  //    let sqlQuery = 'UPDATE student SET statut = 0';
  //      // Exécuter la requête SQL
  //      db.query(sqlQuery, (err, result) => {
  //        if (err) {
  //          console.error(err);
  //          res.status(500).send('Erreur lors de la suppression des étudiants');
  //        } else {
  //          res.status(200).json(result);
  //          console.log(result);
  //        }
  //      });
  //  }
   exports.deleteAllStudents = (req, res) => {
    const sqlQuery = 'UPDATE student SET statut = 0';
    pool.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la suppression des étudiants');
        }
        res.status(200).json(result);
    });
};


   //Supprimer  les étudiants d'une filière
  //  exports.deleteStudentsByFiliere = (req, res) =>
  //  {
  //    const {filiereId } = req.params;
  //    let sqlQuery = 'UPDATE student SET statut = 0 WHERE idFiliere = ?';
  //      // Exécuter la requête SQL
  //      db.query(sqlQuery, [filiereId], (err, result) => {
  //        if (err) {
  //          console.error(err);
  //          res.status(500).send('Erreur lors de la suppression des étudiants');
  //        } else {
  //          res.status(200).json(result);
  //          console.log(result);
  //        }
  //      });
  //  }
   exports.deleteStudentsByFiliere = (req, res) => {
    const { filiereId } = req.params;
    const sqlQuery = 'UPDATE student SET statut = 0 WHERE idFiliere = ?';
    pool.query(sqlQuery, [filiereId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la suppression des étudiants');
        }
        res.status(200).json(result);
    });
};


   //Restaurer  les étudiants d'une filière
  //  exports.restaureStudentsByFiliere = (req, res) =>
  //  {
  //    const {filiereId } = req.params;
  //    let sqlQuery = 'UPDATE student SET statut = 1 WHERE idFiliere = ?';
  //      // Exécuter la requête SQL
  //      db.query(sqlQuery, [filiereId], (err, result) => {
  //        if (err) {
  //          console.error(err);
  //          res.status(500).send('Erreur lors de la suppression des étudiants');
  //        } else {
  //          res.status(200).json(result);
  //          console.log(result);
  //        }
  //      });
  //  }
   exports.restaureStudentsByFiliere = (req, res) => {
    const { filiereId } = req.params;
    const sqlQuery = 'UPDATE student SET statut = 1 WHERE idFiliere = ?';
    pool.query(sqlQuery, [filiereId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la restauration des étudiants');
        }
        res.status(200).json(result);
    });
};

       //Restaurer un etudiant par id
      //  exports.restaureStudentById = (req, res) =>
      //  {
      //    const { id } = req.params;
      //  let  sqlQuery = 'UPDATE student SET statut = true WHERE uid = ?';
      //      // Exécuter la requête SQL
      //      db.query(sqlQuery, [id], (err, result) => {
      //        if (err) {
      //          console.error(err);
      //          res.status(500).send('Erreur lors de la restauration de l\'étudiant');
      //        } else {
      //          res.status(200).json(result);
      //          console.log(result);
      //        }
      //      });
      //  }
       exports.restaureStudentById = (req, res) => {
        const { id } = req.params;
        const sqlQuery = 'UPDATE student SET statut = true WHERE uid = ?';
        pool.query(sqlQuery, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la restauration de l\'étudiant');
            }
            res.status(200).json(result);
        });
    };
   
           //Supprimer un etudiant par id
    // exports.deleteStudentById = (req, res) =>
    // {
    //   const { id } = req.params;
    // let  sqlQuery = 'UPDATE student SET statut = false WHERE uid = ?';
    //     // Exécuter la requête SQL
    //     db.query(sqlQuery, [id], (err, result) => {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send('Erreur lors de la suppression de l\'étudiant');
    //       } else {
    //         res.status(200).json(result);
    //         console.log(result);
    //       }
    //     });
    // }
    exports.deleteStudentById = (req, res) => {
      const { id } = req.params;
      const sqlQuery = 'UPDATE student SET statut = false WHERE uid = ?';
      pool.query(sqlQuery, [id], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Erreur lors de la suppression de l\'étudiant');
          }
          res.status(200).json(result);
      });
  };


//Récupérer un étudiant par son matricule
//     exports.getStudentByMatricule = (req, res) => {
//         console.log(req.query)
//           const  matricule  = req.query.matricule;
//           console.log(matricule);
//           let id;
//           if(req.query.id)
//           {
//             id = req.query.id;
      
//           }
          
//        let sql;
//           // Vérifier si l'utilisateur existe dans la base de données SQL
//           if(id)
//           {
//              sql = `SELECT * FROM student WHERE matricule = ? AND uid != '${id}'`;
      
//           }
//           else
//           {
//              sql = 'SELECT * FROM student WHERE matricule = ?';
      
//           }
//           db.query(sql, [matricule], (err, result) => {
//             if (err) throw err;
//       console.log(result);
       
//             if (result.length > 0) {
//               // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
//               res.send(result[0]);
//             } else {
//               // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
//               res.status(404).send('Student not found in SQL database');
      
              
//             }
//           });
//         };

exports.getStudentByMatricule = (req, res) => {
  const { matricule } = req.query;
  let sql;
  if (req.query.id) {
      sql = 'SELECT * FROM student WHERE matricule = ? AND uid != ?';
  } else {
      sql = 'SELECT * FROM student WHERE matricule = ?';
  }
  pool.query(sql, [matricule, req.query.id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Erreur lors de la récupération de l\'étudiant');
      }
      if (result.length > 0) {
          res.send(result[0]);
      } else {
          res.status(404).send('Student not found in SQL database');
      }
  });
};

//Récupérer un étudiant par son id
      // exports.getStudentById = (req, res) => {
      //     const { id } = req.params;
      //   console.log(req.params)
      //     // Vérifier si l'utilisateur existe dans la base de données SQL
      //     const sql = 'SELECT * FROM student WHERE uid = ?';
      //     db.query(sql, [id], (err, result) => {
      //       if (err) throw err;
      // console.log(result);
      // if(result)
      // {
      //   console.log(result.length);
      
      // }
      //       if (result.length > 0) {
      //         // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
      //         res.send(result[0]);
      //       } else {
      //         // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
      //         res.status(404).send('Student not found in SQL database');
      
              
      //       }
      //     });
      //   };
        exports.getStudentById = (req, res) => {
          const { id } = req.params;
          const sql = 'SELECT * FROM student WHERE uid = ?';
          pool.query(sql, [id], (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Erreur lors de la récupération de l\'étudiant');
              }
              if (result.length > 0) {
                res.send(result[0]);
              } else {
                  res.status(404).send('Student not found in SQL database');
              }
          });
      };
      
      
      //Récupérer les étudiants non supprimés
        // exports.getActifStudentData = (req, res) =>
        // {
        //   const sql = `SELECT * FROM student WHERE statut = true ORDER BY nom, prenom`;
      
        //   db.query(sql, (err, result) =>
        // {
        //   console.log(result);
        //   res.send(result);
        // });
      
        // }  
        exports.getActifStudentData = (req, res) => {
          const sql = 'SELECT * FROM student WHERE statut = true ORDER BY nom, prenom';
          pool.query(sql, (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Erreur lors de la récupération des étudiants actifs');
              }
              res.send(result);
          });
      };

        //Récupérer les étudiants supprimés
        // exports.getInactifStudentData = (req, res) =>
        // {
        //   const sql = `SELECT * FROM student WHERE statut = false ORDER BY nom, prenom`;
      
        //   db.query(sql, (err, result) =>
        // {
        //   console.log(result);
        //   res.send(result);
        // });
      
        // } 
        exports.getInactifStudentData = (req, res) => {
          const sql = 'SELECT * FROM student WHERE statut = false ORDER BY nom, prenom';
          pool.query(sql, (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Erreur lors de la récupération des étudiants inactifs');
              }
              res.send(result);
          });
      }; 
        
      //Récupérer les étudiants selon la recherche
        // exports.getStudentData = (req, res) =>
        // {
        //   const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
        //   const idFiliere = req.query.idFiliere; // Récupérer la valeur de idFiliere depuis la requête
        //   const niveau = req.query.niveau;
        
        //   let sqlQuery = `SELECT * FROM student WHERE statut = true`;
        //   if (searchText) {
        //     sqlQuery += ` AND (nom LIKE '%${searchText}%' OR prenom LIKE '%${searchText}' OR matricule LIKE '%${searchText}%')`;
        //   }
      
        //   if(idFiliere)
        //   {
        //     sqlQuery += ` AND idFiliere = ${idFiliere} `;
        //   }
      
        //   if(niveau)
        //   {
        //     sqlQuery += ` AND niveau LIKE '%${niveau}%' `;
        //   }

        //   sqlQuery += ` ORDER BY nom, prenom`;
        
        //   console.log(sqlQuery);
      
        //   db.query(sqlQuery, (err, result) =>
        // {
        //   console.log(result);
        //   res.send(result);
        // });
      
        // }  

        exports.getStudentData = (req, res) => {
          const searchText = req.query.search;
          const idFiliere = req.query.idFiliere;
          const niveau = req.query.niveau;
      
          let sqlQuery = 'SELECT * FROM student WHERE statut = true';
      
          if (searchText) {
              sqlQuery += ` AND (nom LIKE '%${searchText}%' OR prenom LIKE '%${searchText}' OR matricule LIKE '%${searchText}%')`;
          }
      
          if (idFiliere) {
              sqlQuery += ` AND idFiliere = ${idFiliere}`;
          }
      
          if (niveau) {
              sqlQuery += ` AND niveau LIKE '%${niveau}%'`;
          }
      
          sqlQuery += ' ORDER BY nom, prenom';
      
          pool.query(sqlQuery, (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Erreur lors de la récupération des données des étudiants');
              }
              res.send(result);
          });
      };
  