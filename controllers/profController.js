// const db = require('../config/db');
const pool = require('../config/db');


//Ajout d'un prof
// exports.createProf = (req, res) => {
//     const { uid, email, nom, prenom, phone } = req.body;
//     console.log(req.body);
  
//     // Vérifier si l'utilisateur existe déjà dans la base de données SQL
//     const sql = 'SELECT * FROM prof WHERE uid = ?';
//     db.query(sql, [uid], (err, result) => {
//       if (err) throw err;
  
//       if (result.length > 0) {
//         // L'utilisateur existe déjà dans la base de données SQL
//         res.send('Teacher already exists in SQL database');
//       } else {
//         // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
//         const sql = 'INSERT INTO prof (uid, email, nom, prenom, phone, statut) VALUES (?, ?, ?, ?, ?, ?)';
//         db.query(sql, [uid, email, nom, prenom, phone, true], (err, result) => {
//           if (err) throw err;
//           res.send('Teacher added to SQL database');
//         });
//       }
//     });
//   };
  exports.createProf = (req, res) => {
    const { uid, email, nom, prenom, phone } = req.body;
    // console.log(req.body);

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la création du prof');
        }

        const sql = 'SELECT * FROM prof WHERE uid = ?';
        connection.query(sql, [uid], (err, result) => {
            if (err) {
                connection.release();
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                connection.release();
                res.send('Teacher already exists in SQL database');
            } else {
                const sqlInsert = 'INSERT INTO prof (uid, email, nom, prenom, phone, statut) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(sqlInsert, [uid, email, nom, prenom, phone, true], (err, result) => {
                    connection.release();
                    if (err) {
                        res.status(500).send('Erreur lors de la création du prof');
                    } else {
                        res.send('Teacher added to SQL database');
                    }
                });
            }
        });
    });
};

    //Modifier Prof
    // exports.updateProfById = (req, res) => {
    //   const {uid, nom, prenom, phone } = req.body;
     
    //   const sqlQuery = 'UPDATE prof SET nom = ?, prenom = ?, phone = ?WHERE uid = ? ';
    //   db.query(sqlQuery, [nom, prenom, phone, uid], (err, result) =>{
    //     if (err) throw err;
    //     res.status(200).send('Prof modifié avec succès');
    //   });
    // }
    exports.updateProfById = (req, res) => {
      const { uid, nom, prenom, phone } = req.body;
      const sqlQuery = 'UPDATE prof SET nom = ?, prenom = ?, phone = ? WHERE uid = ?';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la mise à jour du prof');
          }
          connection.query(sqlQuery, [nom, prenom, phone, uid], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la mise à jour du prof');
              } else {
                  res.status(200).send('Prof modifié avec succès');
              }
          });
      });
  };

   //Supprimer tous les profs
  // exports.deleteAllProfs = (req, res) =>
  //  {
  // let   sqlQuery = 'UPDATE prof SET statut = 0';
  //      // Exécuter la requête SQL
  //      db.query(sqlQuery, (err, result) => {
  //        if (err) {
  //          console.error(err);
  //          res.status(500).send('Erreur lors de la suppression des professeurs');
  //        } else {
  //          res.status(200).json(result);
  //          console.log(result);
  //        }
  //      });
  //  }
   exports.deleteAllProfs = (req, res) => {
    const sqlQuery = 'UPDATE prof SET statut = 0';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la suppression des professeurs');
        }
        connection.query(sqlQuery, (err, result) => {
            connection.release();
            if (err) {
                res.status(500).send('Erreur lors de la suppression des professeurs');
            } else {
                res.status(200).json(result);
            }
        });
    });
};

        //Restaurer un prof par id
        // exports.restaureProfById = (req, res) =>
        // {
        //   const { id } = req.params;
        //   sqlQuery = 'UPDATE prof SET statut = true WHERE uid = ?';
        //     // Exécuter la requête SQL
        //     db.query(sqlQuery, [id], (err, result) => {
        //       if (err) {
        //         console.error(err);
        //         res.status(500).send('Erreur lors de la restauration du prof');
        //       } else {
        //         res.status(200).json(result);
        //         console.log(result);
        //       }
        //     });
        // }
        exports.restaureProfById = (req, res) => {
          const { id } = req.params;
          const sqlQuery = 'UPDATE prof SET statut = true WHERE uid = ?';
      
          pool.getConnection((err, connection) => {
              if (err) {
                  console.error('Error getting connection from pool:', err);
                  return res.status(500).send('Erreur lors de la restauration du professeur');
              }
              connection.query(sqlQuery, [id], (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send('Erreur lors de la restauration du professeur');
                  } else {
                      res.status(200).json(result);
                  }
              });
          });
      };
    

      //Supprimer un prof par id
    //  exports.deleteProfById = (req, res) =>
    //  {
    //    const { id } = req.params;
    //    sqlQuery = 'UPDATE prof SET statut = false WHERE uid = ?';
    //      // Exécuter la requête SQL
    //      db.query(sqlQuery, [id], (err, result) => {
    //        if (err) {
    //          console.error(err);
    //          res.status(500).send('Erreur lors de la suppression du professeur');
    //        } else {
    //          res.status(200).json(result);
    //          console.log(result);
    //        }
    //      });
    //  }
     exports.deleteProfById = (req, res) => {
      const { id } = req.params;
      const sqlQuery = 'UPDATE prof SET statut = false WHERE uid = ?';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la suppression du professeur');
          }
          connection.query(sqlQuery, [id], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la suppression du professeur');
              } else {
                  res.status(200).json(result);
              }
          });
      });
  };
   

// Récupérer les professeurs actifs
    //  exports.getActifProfData = (req, res) =>
    //  {
    //    const sql = `SELECT * FROM prof WHERE statut = true ORDER BY nom, prenom`;
    //    db.query(sql, (err, result) =>
    //  {
    //    console.log(result);
    //    res.send(result);
    //  });
    // } 
     exports.getActifProfData = (req, res) => {
      const sql = 'SELECT * FROM prof WHERE statut = true ORDER BY nom, prenom';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération des professeurs actifs');
          }
          connection.query(sql, (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération des professeurs actifs');
              } else {
                  res.send(result);
              }
          });
      });
  };
   // Récupérer les professeurs inactifs
    //  exports.getInactifProfData = (req, res) =>
    //  {
    //    const sql = `SELECT * FROM prof WHERE statut = false ORDER BY nom, prenom`;
    //    db.query(sql, (err, result) =>
    //  {
    //    console.log(result);
    //    res.send(result);
    //  }); 
    //  } 
     exports.getInactifProfData = (req, res) => {
      const sql = 'SELECT * FROM prof WHERE statut = false ORDER BY nom, prenom';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération des professeurs inactifs');
          }
          connection.query(sql, (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération des professeurs inactifs');
              } else {
                  res.send(result);
              }
          });
      });
  }; 
   
         //Recupérer les profs actifs selon la recherche
        //  exports.getProfData = (req, res) =>
        //  {
        //      const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
        //      const filtre = req.query.filtre; // Récupérer la valeur du filtre depuis la requête
        //      let sqlQuery = 'SELECT * FROM prof WHERE statut = true';      
        //      // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
        //      if (searchText && filtre == "Nom") {
        //        sqlQuery += ` AND nom LIKE '%${searchText}%' `;
        //      }
        //      else if(searchText && filtre == "Prenom")
        //      {
        //        sqlQuery += ` AND prenom LIKE '%${searchText}%' `;
        //      
        //      sqlQuery += ` ORDER BY nom, prenom`;  
        //      // Exécuter la requête SQL
        //      db.query(sqlQuery, (err, result) => {
        //        if (err) {
        //          console.error(err);
        //          res.status(500).send('Erreur lors de la récupération des profs');
        //        } else {
        //          res.status(200).json(result);
        //          console.log(result);
        //        }
        //      });
           
        //  }
         exports.getProfData = (req, res) => {
          const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
          const filtre = req.query.filtre; // Récupérer la valeur du filtre depuis la requête
      
          let sqlQuery = 'SELECT * FROM prof WHERE statut = true';
      
          // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
          if (searchText && filtre == "Nom") {
              sqlQuery += ` AND nom LIKE '%${searchText}%' `;
          } else if (searchText && filtre == "Prenom") {
              sqlQuery += ` AND prenom LIKE '%${searchText}%' `;
          }
      
          sqlQuery += ' ORDER BY nom, prenom';
      
          pool.getConnection((err, connection) => {
              if (err) {
                  console.error('Error getting connection from pool:', err);
                  return res.status(500).send('Erreur lors de la récupération des professeurs');
              }
              connection.query(sqlQuery, (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send('Erreur lors de la récupération des professeurs');
                  } else {
                      res.status(200).json(result);
                  }
              });
          });
      };
     // Récupérer un professeur par id
        //  exports.getProfById = (req, res) => 
        //  {
        //    const { id } = req.params; 
        //    console.log(id);
        //    const sql = `SELECT * FROM prof WHERE uid = ?`;
        //    db.query(sql, [id], (err, result)=>
        //  {
        //    if(result.length > 0)
        //    {
        //      res.status(200).send(result[0]);
        //    }
        //    else
        //    {
        //      res.status(404).send('Prof non trouvée dans la base de données')
        //    }
        //  })
        //  }
        exports.getProfById = (req, res) => {
          const { id } = req.params;
          const sql = 'SELECT * FROM prof WHERE uid = ?';
      
          pool.getConnection((err, connection) => {
              if (err) {
                  console.error('Error getting connection from pool:', err);
                  return res.status(500).send('Erreur lors de la récupération du professeur');
              }
              connection.query(sql, [id], (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send('Erreur lors de la récupération du professeur');
                  } else if (result.length > 0) {
                      res.status(200).send(result[0]);
                  } else {
                      res.status(404).send('Prof non trouvé dans la base de données');
                  }
              });
          });
      };
   