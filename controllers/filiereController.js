// const db = require('../config/db');
const pool = require('../config/db');

//Creer une filiere 
// exports.createFiliere = (req, res) => {
//     const { nomFiliere, sigleFiliere, niveaux, statut } = req.body;
//     console.log(req.body);
//     // Vérifier si l'utilisateur existe déjà dans la base de données SQL
//     const sql = 'SELECT * FROM filiere WHERE sigleFiliere = ?';
//     db.query(sql, [sigleFiliere], (err, result) => {
//       if (err) throw err;
//       if (result.length > 0) {
//         // La filière existe déjà dans la base de données SQL
//         res.send('Une filière avec le même sigle existe déjà');
//       } else {
//         let allNiveaux = niveaux.join(',');
//         // La filière n'existe pas dans la base de données SQL, l'ajouter
//         const sql = 'INSERT INTO filiere (nomFiliere, sigleFiliere, niveaux, statut) VALUES (?, ?, ?, ?)';
//         db.query(sql, [nomFiliere, sigleFiliere, allNiveaux, statut], (err, result) => {
//           if (err) throw err;
//           res.send('Filière ajoutée avec succès');
//         });
//       }
//     });
//   };
exports.createFiliere = (req, res) => {
  const { nomFiliere, sigleFiliere, niveaux, statut } = req.body;
  // console.log(req.body);

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la création de la filière');
      }

      const sql = 'SELECT * FROM filiere WHERE sigleFiliere = ?';
      connection.query(sql, [sigleFiliere], (err, result) => {
          if (err) {
              connection.release();
              return res.status(500).send(err);
          }

          if (result.length > 0) {
              connection.release();
              res.send('Une filière avec le même sigle existe déjà');
          } else {
              let allNiveaux = niveaux.join(',');
              const sqlInsert = 'INSERT INTO filiere (nomFiliere, sigleFiliere, niveaux, statut) VALUES (?, ?, ?, ?)';
              connection.query(sqlInsert, [nomFiliere, sigleFiliere, allNiveaux, statut], (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send('Erreur lors de la création de la filière');
                  } else {
                      res.send('Filière ajoutée avec succès');
                  }
              });
          }
      });
  });
};



  //Mettre à jour une filière  
  // exports.updateFiliereById = (req, res) => {
  //   const {idFiliere, nomFiliere, sigleFiliere, niveaux } = req.body;
  //   let allNiveaux = niveaux.join(',');
  //   const sqlQuery = 'UPDATE filiere SET nomFiliere = ?, sigleFiliere = ?, niveaux = ? WHERE idFiliere = ? ';
  //   db.query(sqlQuery, [nomFiliere, sigleFiliere, allNiveaux, idFiliere], (err, result) =>{
  //     if (err) throw err;
  //     res.status(200).send('Filière modifiée avec succès');
  //   });
  // }
  exports.updateFiliereById = (req, res) => {
    const { idFiliere, nomFiliere, sigleFiliere, niveaux } = req.body;
    let allNiveaux = niveaux.join(',');
    const sqlQuery = 'UPDATE filiere SET nomFiliere = ?, sigleFiliere = ?, niveaux = ? WHERE idFiliere = ?';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la mise à jour de la filière');
        }
        connection.query(sqlQuery, [nomFiliere, sigleFiliere, allNiveaux, idFiliere], (err, result) => {
            connection.release();
            if (err) {
                res.status(500).send('Erreur lors de la mise à jour de la filière');
            } else {
                res.status(200).send('Filière modifiée avec succès');
            }
        });
    });
};

  
    //Supprimer tous les filieres
    // exports.deleteAllFilieres = (req, res) =>
    // {
    // let   sqlQuery = 'UPDATE filiere SET statut = 0';
    //     // Exécuter la requête SQL
    //     db.query(sqlQuery, (err, result) => {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send('Erreur lors de la suppression des filières');
    //       } else {
    //         res.status(200).json(result);
    //         console.log(result);
    //       }
    //     });
    // }
    exports.deleteAllFilieres = (req, res) => {
      const sqlQuery = 'UPDATE filiere SET statut = 0';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la suppression des filières');
          }
          connection.query(sqlQuery, (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la suppression des filières');
              } else {
                  res.status(200).json(result);
              }
          });
      });
  };
  
    //Supprimer une filiere par id
    // exports.deleteFiliereById = (req, res) =>
    // {
    //   const { id } = req.params;
    //  let sqlQuery = 'UPDATE filiere SET statut = false WHERE idFiliere = ?';
    //     // Exécuter la requête SQL
    //     db.query(sqlQuery, [id], (err, result) => {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send('Erreur lors de la suppression de la filière');
    //       } else {
    //         res.status(200).json(result);
    //         console.log(result);
    //       }
    //     });
    // }
    exports.deleteFiliereById = (req, res) => {
      const { id } = req.params;
      const sqlQuery = 'UPDATE filiere SET statut = false WHERE idFiliere = ?';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la suppression de la filière');
          }
          connection.query(sqlQuery, [id], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la suppression de la filière');
              } else {
                  res.status(200).json(result);
              }
          });
      });
  };
  
    //Restaurer une filiere par id
    // exports.restaureFiliereById = (req, res) =>
    // {
    //   const { id } = req.params;
    // let  sqlQuery = 'UPDATE filiere SET statut = true WHERE idFiliere = ?';
    //     // Exécuter la requête SQL
    //     db.query(sqlQuery, [id], (err, result) => {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send('Erreur lors de la restauration de la filière');
    //       } else {
    //         res.status(200).json(result);
    //         console.log(result);
    //       }
    //     });
    // }
    exports.restaureFiliereById = (req, res) => {
      const { id } = req.params;
      const sqlQuery = 'UPDATE filiere SET statut = true WHERE idFiliere = ?';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la restauration de la filière');
          }
          connection.query(sqlQuery, [id], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la restauration de la filière');
              } else {
                  res.status(200).json(result);
              }
          });
      });
  };
  


    //GET METHODES
//Récupérer une filière par sigle
    // exports.getFiliereBySigle = (req, res) => 
    // {
    //   const { sigle } = req.params;
  
    //   console.log(sigle);
    //   const sql = `SELECT * FROM filiere WHERE sigleFiliere = ?`;
    //   db.query(sql, [sigle], (err, result)=>
    // {
    //   if(result.length > 0)
    //   {
    //     res.status(200).send(result);
    //   }
    //   else
    //   {
    //     res.status(404).send('Filière non trouvée dans la base de données')
    //   }
    // })
    // }
    exports.getFiliereBySigle = (req, res) => {
      const { sigle } = req.params;
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération de la filière');
          }
          const sql = 'SELECT * FROM filiere WHERE sigleFiliere = ?';
          connection.query(sql, [sigle], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération de la filière');
              } else if (result.length > 0) {
                  res.status(200).send(result);
              } else {
                  res.status(404).send('Filière non trouvée dans la base de données');
              }
          });
      });
  };

//Récupérer une filière par nom
    // exports.getFiliereByName = (req, res) => 
    // {
    //   const { nom } = req.params;
  
    //   console.log(nom);
    //   const sql = `SELECT * FROM filiere WHERE nomFiliere LIKE '%${nom}%'`;
    //   db.query(sql, (err, result)=>
    // {console.log(sql);
    //   console.log(result);
    //   if(result.length > 0)
    //   {
    //     res.status(200).send(result);
    //   }
    //   else
    //   {
    //     res.status(404).send('Filière non trouvée dans la base de données')
    //   }
    // })
    // }
    exports.getFiliereByName = (req, res) => {
      const { nom } = req.params;
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération de la filière');
          }
          const sql = `SELECT * FROM filiere WHERE nomFiliere LIKE ?`;
          connection.query(sql, [`%${nom}%`], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération de la filière');
              } else if (result.length > 0) {
                  res.status(200).send(result);
              } else {
                  res.status(404).send('Filière non trouvée dans la base de données');
              }
          });
      });
  };

//Récupérer une filière par id
    // exports.getFiliereById = (req, res) => 
    // {
    //   const { id } = req.params;
  
    //   console.log(id);
    //   const sql = `SELECT * FROM filiere WHERE idFiliere = ?`;
    //   db.query(sql, [id], (err, result)=>
    // {
    //   if(result.length > 0)
    //   {
    //     res.status(200).send(result);
    //   }
    //   else
    //   {
    //     res.status(404).send('Filière non trouvée dans la base de données')
    //   }
    // })
    // }
    exports.getFiliereById = (req, res) => {
      const { id } = req.params;
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération de la filière');
          }
          const sql = 'SELECT * FROM filiere WHERE idFiliere = ?';
          connection.query(sql, [id], (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération de la filière');
              } else if (result.length > 0) {
                  res.status(200).send(result);
              } else {
                  res.status(404).send('Filière non trouvée dans la base de données');
              }
          });
      });
  };
  
  //Récupérer les filières actives
    // exports.getActifFiliereData = (req, res) =>
    // {
    //   const sql = `SELECT * FROM filiere WHERE statut = true`;
    //   db.query(sql, (err, result) =>
    // {
    //   console.log(result);
    //   res.send(result);
    // });
    // }
    exports.getActifFiliereData = (req, res) => {
      const sql = 'SELECT * FROM filiere WHERE statut = true';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération des filières actives');
          }
          connection.query(sql, (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération des filières actives');
              } else {
                  res.status(200).send(result);
              }
          });
      });
  };


//Récupérer les filières inactives
    // exports.getInactifFiliereData = (req, res) =>
    // {
    //   const sql = `SELECT * FROM filiere WHERE statut = false`;
    //   db.query(sql, (err, result) =>
    // {
    //   console.log(result);
    //   res.send(result);
    // });
    // }
    exports.getInactifFiliereData = (req, res) => {
      const sql = 'SELECT * FROM filiere WHERE statut = false';
  
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error getting connection from pool:', err);
              return res.status(500).send('Erreur lors de la récupération des filières inactives');
          }
          connection.query(sql, (err, result) => {
              connection.release();
              if (err) {
                  res.status(500).send('Erreur lors de la récupération des filières inactives');
              } else {
                  res.status(200).send(result);
              }
          });
      });
  };

  
      //Recupérer les filières actives selon la recherche
      // exports.getFiliereData = (req, res) =>
      // {
        
      //     const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
        
      //     let sqlQuery = 'SELECT * FROM filiere WHERE statut = true';
        
      //     // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
      //     if (searchText) {
      //       sqlQuery += ` AND nomFiliere LIKE '%${searchText}%' `;
      //     }
        
      //     // Exécuter la requête SQL
      //     db.query(sqlQuery, (err, result) => {
      //       if (err) {
      //         console.log(err);
      //         res.status(500).send('Erreur lors de la récupération des filières');
      //       } else {
      //         res.status(200).json(result);
      //         console.log(result);
      //       }
      //     });
        
      // }
      exports.getFiliereData = (req, res) => {
        const searchText = req.query.search;
        let sqlQuery = 'SELECT * FROM filiere WHERE statut = true';
    
        if (searchText) {
            sqlQuery += ` AND nomFiliere LIKE ?`;
        }
    
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return res.status(500).send('Erreur lors de la récupération des filières');
            }
            connection.query(sqlQuery, [`%${searchText}%`], (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).send('Erreur lors de la récupération des filières');
                } else {
                    res.status(200).send(result);
                }
            });
        });
    };
