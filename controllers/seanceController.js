
// const db = require('../config/db');
const pool = require('../config/db');

//Mettre à jour la présence
// exports.updateSeancePresence = (req, res) =>{
// const seanceId = req.body.idSeance;
// const presence = req.body.presenceEtudiant;
// console.log(req.body);
// const sqlQuery= "UPDATE seance SET presenceEtudiant = ?, presenceTookOnce = ? WHERE idSeance =? ";
// db.query(sqlQuery, [JSON.stringify(presence), true, seanceId], (err, result) =>{
//     console.log(sqlQuery);
//     if (err) {
//         res.status(500).send(`Erreur: ${err}`);
//     }
//     else
//     {
//     res.status(200).send('Présence enregistrée avec succès');
//     }
  
// }) 

// }
exports.updateSeancePresence = (req, res) => {
  const { seanceId, presence } = req.body;
console.log(seanceId);
  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Transaction error');
      }

      connection.beginTransaction(err => {
          if (err) {
              connection.release();
              return res.status(500).send('Transaction error');
          }

          connection.query('SELECT presenceEtudiant, version FROM seance WHERE idSeance = ?', [seanceId], (err, results) => {
              if (err || results.length === 0) {
                  return connection.rollback(() => {
                      connection.release();
                      res.status(500).send('Error retrieving seance. ${err)');
                      console.log("Error retrieving seance : ${results}");
                  
                  });
              }

              const seance = results[0];
            //   const presence = JSON.parse(seance.presenceEtudiant);
            //   presence[etudiantId] = true;

            //   const newPresenceJson = JSON.stringify(presence);
              const newVersion = seance.version + 1;

              connection.query('UPDATE seance SET presenceEtudiant = ?,presenceTookOnce = ?, version = ? WHERE idSeance = ? AND version = ?', [JSON.stringify(presence),true, newVersion, seanceId, seance.version], (err, results) => {
                  if (err || results.affectedRows === 0) {
                      return connection.rollback(() => {
                          connection.release();
                          res.status(500).send('Error updating seance or version mismatch');
                      });
                  }

                  connection.commit(err => {
                      if (err) {
                        console.error(err);
                          return connection.rollback(() => {
                              connection.release();
                              res.status(500).send('Commit error');
                          });
                      }
                      connection.release();
                      res.send('Presence updated successfully');
                  });
              });
          });
      });
  });
};

//Creer une séance
// exports.createSeance = (req, res) => {
//     const seanceData = req.body;
//     // Extraire les données JSON du corps de la requête
//     console.log(seanceData);
//     const dateSeance = seanceData.dateSeance;
//     const idCours = seanceData.idCours;
//     const isActive = seanceData.isActive;
//     const presenceEtudiant = seanceData.presenceEtudiant;
//     const presenceTookOnce = seanceData.presenceTookOnce;
//     const seanceCode = seanceData.seanceCode;
  
//     // Insérer les données dans la table seance de la base de données SQL
//     const query = `
//       INSERT INTO seance (dateSeance, idCours, isActive, presenceEtudiant, presenceTookOnce, seanceCode)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
  
//     db.query(query, [dateSeance, idCours, isActive, JSON.stringify(presenceEtudiant), presenceTookOnce, seanceCode], (err, result) => {
//       if (err) throw err;
//       res.status(200).send('Séance enregistrée avec succès');
//     });
//   }
  exports.createSeance = (req, res) => {
    const seanceData = req.body;
    const { dateSeance, idCours, isActive, presenceEtudiant, presenceTookOnce, seanceCode } = seanceData;

    const query = `
        INSERT INTO seance (dateSeance, idCours, isActive, presenceEtudiant, presenceTookOnce, seanceCode)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la création de la séance');
        }

        connection.query(query, [dateSeance, idCours, isActive, JSON.stringify(presenceEtudiant), presenceTookOnce, seanceCode], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la création de la séance');
            }
            res.status(200).send('Séance enregistrée avec succès');
        });
    });
};

//UPDATE SEANCE STATUS
  // exports.updateSeanceStatus = (req, res) =>
  // {
  //   const {idSeance, action } = req.body;
  //   let sqlQuery;
  //     switch (action) {
  //       case "start":
  //         sqlQuery = "UPDATE seance SET isActive = true WHERE idSeance = ?";
    
  //         break;
    
  //       case "stop" :
  //          sqlQuery = 'UPDATE seance SET isActive = false  WHERE idSeance = ?';
    
  //       break;
    
  //     }
  //     db.query(sqlQuery, [idSeance], (err, result) => {
  //       if (err) {
  //           console.error(err);
  //           res.status(500).send('Erreur lors de la modification');
  //         } else {
  //           res.status(200).send(result);
  //   //        console.log(result);
  //         }
  //     })
  // }
  exports.updateSeanceStatus = (req, res) => {
    const { idSeance, action } = req.body;
    let sqlQuery;

    switch (action) {
        case "start":
            sqlQuery = "UPDATE seance SET isActive = true WHERE idSeance = ?";
            break;
        case "stop":
            sqlQuery = 'UPDATE seance SET isActive = false WHERE idSeance = ?';
            break;
        default:
            return res.status(400).send('Action non reconnue');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la modification');
        }

        connection.query(sqlQuery, [idSeance], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la modification');
            }
            res.status(200).send(result);
        });
    });
};

//Suprimer une séance
//   exports.deleteSeance = (req, res) =>
//   {
//     const {idSeance} = req.params;
//     let sqlQuery = "DELETE FROM  seance WHERE idSeance = ? ";
//     db.query(sqlQuery, [idSeance], (err, result) =>
// {
//     console.log(sqlQuery);
//     if (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de la suppression');
//       } else {
//         res.status(200).send(result);
//         console.log(result);
//       }
// })
    
         
//   }
  exports.deleteSeance = (req, res) => {
    const { idSeance } = req.params;
    const sqlQuery = "DELETE FROM seance WHERE idSeance = ?";

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la suppression');
        }

        connection.query(sqlQuery, [idSeance], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la suppression');
            }
            res.status(200).send(result);
        });
    });
};


//Récupérer les séances
//   exports.getSeanceData = (req, res) =>
// {
  
    
//     const idCours = req.query.idCours; 
    
   
//     let sqlQuery = 'SELECT * FROM seance  ';

    


//     if (idCours) {
//       sqlQuery += ` WHERE idCours = ${idCours} `;
//     }

    

//     sqlQuery += ' ORDER BY  dateSeance DESC ';

  
  
//     console.log(sqlQuery);
//     // Exécuter la requête SQL
//     db.query(sqlQuery, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Erreur lors de la récupération des seances');
//       } else {
//         res.status(200).json(result);
//     //    console.log(result);
//       }
//     });
  
// }
exports.getSeanceData = (req, res) => {
  const idCours = req.query.idCours;
  let sqlQuery = 'SELECT * FROM seance';

  if (idCours) {
      sqlQuery += ` WHERE idCours = ${idCours}`;
  }

  sqlQuery += ' ORDER BY dateSeance DESC';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération des séances');
      }

      connection.query(sqlQuery, (err, result) => {
          connection.release();
          if (err) {
              console.error(err);
              return res.status(500).send('Erreur lors de la récupération des séances');
          }
          res.status(200).json(result);
      });
  });
};


//Récupérer une séance par son code
// exports.getSeanceByCode = (req, res) => {
//   const { code } = req.params;
// console.log(req.params)
//   // Vérifier si l'utilisateur existe dans la base de données SQL
//   const sql = 'SELECT * FROM seance WHERE seanceCode = ?';
//   db.query(sql, [code], (err, result) => {
//     if (err) throw err;
// console.log(result);
// if(result)
// {
// console.log(result.length);

// }
//     if (result.length > 0) {
//       res.send(result[0]);
//     } else {
      
//       res.status(404).send('Seance not found in SQL database');

      
//     }
//   });
// };
exports.getSeanceByCode = (req, res) => {
  const { code } = req.params;
  const sqlQuery = 'SELECT * FROM seance WHERE seanceCode = ?';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération de la séance');
      }

      connection.query(sqlQuery, [code], (err, result) => {
          connection.release();
          if (err) {
              console.error(err);
              return res.status(500).send('Erreur lors de la récupération de la séance');
          }
          if (result.length > 0) {
              res.send(result[0]);
          } else {
              res.status(404).send('Séance non trouvée dans la base de données SQL');
          }
      });
  });
};
