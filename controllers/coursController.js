// const db = require('../config/db');
const pool = require('../config/db');


  //Supprimer tous les cours
  // exports.deleteAllCourses = (req, res) =>
  // {
  //   let sqlQuery = 'UPDATE cours SET statut = 0';
  //     // Exécuter la requête SQL
  //     db.query(sqlQuery, (err, result) => {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Erreur lors de la suppression des cours');
  //       } else {
  //         res.status(200).json(result);
  //         console.log(result);
  //       }
  //     });
  // }
  exports.deleteAllCourses = (req, res) => {
    const sqlQuery = 'UPDATE cours SET statut = 0';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la suppression des cours');
        }
        connection.query(sqlQuery, (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de la suppression des cours');
            } else {
                res.status(200).json(result);
                console.log(result);
            }
        });
    });
};






  //Supprimer tous les cours d'une filiere
  // exports.deleteCoursesByFiliere = (req, res) =>
  // {
  //   const {filiereId} = req.params;
  // let  sqlQuery = 'UPDATE cours SET statut = 0 WHERE idFiliere = ?';
  //     // Exécuter la requête SQL
  //     db.query(sqlQuery,[filiereId], (err, result) => {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Erreur lors de la suppression des cours associés');
  //       } else {
  //         res.status(200).json(result);
  //         console.log(result);
  //       }
  //     });
  // }
  exports.deleteCoursesByFiliere = (req, res) => {
    const { filiereId } = req.params;
    const sqlQuery = 'UPDATE cours SET statut = 0 WHERE idFiliere = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la suppression des cours associés à la filière');
        }
        connection.query(sqlQuery, [filiereId], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de la suppression des cours associés à la filière');
            } else {
                res.status(200).json(result);
                console.log(result);
            }
        });
    });
};

  //Restaurer les cours d'une filière
  // exports.restaureCoursesByFiliere = (req, res) =>
  // {
  //   const {filiereId} = req.params;
  // let  sqlQuery = 'UPDATE cours SET statut = 1 WHERE idFiliere = ?';
  //     // Exécuter la requête SQL
  //     db.query(sqlQuery,[filiereId], (err, result) => {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Erreur lors de la restauration des cours associés');
  //       } else {
  //         res.status(200).json(result);
  //         console.log(result);
  //       }
  //     });
  // }
  exports.restaureCoursesByFiliere = (req, res) => {
    const { filiereId } = req.params;
    const sqlQuery = 'UPDATE cours SET statut = 1 WHERE idFiliere = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la restauration des cours associés');
        }
        connection.query(sqlQuery, [filiereId], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de la restauration des cours associés');
            } else {
                res.status(200).json(result);
                console.log(result);
            }
        });
    });
};



  // Supprimer un cours par id
  // exports.deleteCourseById = (req, res) => {
  //   const { id } = req.params;
  //   const sqlQuery = 'DELETE  FROM cours WHERE idCours = ?';
  //   // Exécuter la requête SQL
  //   db.query(sqlQuery, [id], (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Erreur lors de la suppression du cours');
  //     } else {
  //       res.status(200).send(result);
  //       console.log(result);
  //     }
  //   });
  // }
  exports.deleteCourseById = (req, res) => {
    const { id } = req.params;
    const sqlQuery = 'DELETE FROM cours WHERE idCours = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('Erreur lors de la suppression du cours');
        }
        connection.query(sqlQuery, [id], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de la suppression du cours');
            } else {
                res.status(200).send(result);
                console.log(result);
            }
        });
    });
};


//Creer cours
// exports.createCourse = (req, res) =>
// {
//   const {nomCours, sigleCours, niveau, idProfesseur, idFiliere} = req.body;
//   // Vérifier si l'utilisateur existe déjà dans la base de données SQL
//   const sql = 'SELECT * FROM cours WHERE sigleCours = ?';
//   db.query(sql, [sigleCours], (err, result) => {
//     if (err) throw err;

//     if (result.length > 0) {
//       // Le cours existe déjà dans la base de données SQL
//       res.send({
//         "message": "Un cours avec le même sigle(identifiant) existe déjà",
//         result     
//       })
//     } else {  
//       // Le cours n'existe pas dans la base de données SQL, l'ajouter
//       const sqlQuery = 'INSERT INTO cours (nomCours, sigleCours, niveau, idProfesseur, idFiliere, statut) VALUES (?, ?, ?, ?, ?, ?)';
//       db.query(sqlQuery, [nomCours, sigleCours, niveau, idProfesseur, idFiliere, true], (err, result) =>{
//         if (err)
//         {
//           res.send('Erreur lors de la création du cours')
//           throw err;
//         }
//         else
//         {
//           res.send("Cours ajouté avec succès!")
//         }
//       })
//     }
//   });
// }
exports.createCourse = (req, res) => {
  const { nomCours, sigleCours, niveau, idProfesseur, idFiliere } = req.body;

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la création du cours');
      }

      const sql = 'SELECT * FROM cours WHERE sigleCours = ?';
      connection.query(sql, [sigleCours], (err, result) => {
          if (err) {
              connection.release();
              return res.status(500).send(err);
          }

          if (result.length > 0) {
              connection.release();
              res.send({
                  message: "Un cours avec le même sigle(identifiant) existe déjà",
                  result
              });
          } else {
              const sqlQuery = 'INSERT INTO cours (nomCours, sigleCours, niveau, idProfesseur, idFiliere, statut) VALUES (?, ?, ?, ?, ?, ?)';
              connection.query(sqlQuery, [nomCours, sigleCours, niveau, idProfesseur, idFiliere, true], (err, result) => {
                  connection.release();
                  if (err) {
                      res.status(500).send('Erreur lors de la création du cours');
                  } else {
                      res.send("Cours ajouté avec succès!");
                  }
              });
          }
      });
  });
};

// Mettre à jour un cours par id
// exports.updateCourseById = (req, res) => {
//   const {idCours, nomCours, sigleCours, niveau, idFiliere, idProfesseur } = req.body;
//   const sqlQuery = 'UPDATE cours SET nomCours = ?, sigleCours = ?, niveau = ?, idFiliere = ?, idProfesseur = ? WHERE idCours = ? ';
//   db.query(sqlQuery, [nomCours, sigleCours, niveau, idFiliere,idProfesseur, idCours  ], (err, result) =>{
//     if (err) throw err;
//     res.status(200).send('Cours modifié avec succès');
//   });
// }
exports.updateCourseById = (req, res) => {
  const { idCours, nomCours, sigleCours, niveau, idFiliere, idProfesseur } = req.body;
  const sqlQuery = 'UPDATE cours SET nomCours = ?, sigleCours = ?, niveau = ?, idFiliere = ?, idProfesseur = ? WHERE idCours = ?';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la mise à jour du cours');
      }
      connection.query(sqlQuery, [nomCours, sigleCours, niveau, idFiliere, idProfesseur, idCours], (err, result) => {
          connection.release();
          if (err) {
              res.status(500).send('Erreur lors de la mise à jour du cours');
          } else {
              res.status(200).send('Cours modifié avec succès');
          }
      });
  });
};


//GET METHODES

// Récupérer un cours par sigle
// exports.getCourseBySigle = (req, res) => 
// {
//   const { sigle } = req.params;
//   console.log(sigle);
//   const sql = `SELECT * FROM cours WHERE sigleCours = ?`;
//   db.query(sql, [sigle], (err, result)=>
// {
//   if(result.length > 0)
//   {
//     res.status(200).send(result);
//   }
//   else
//   {
//     res.status(404).send('Cours non trouvé dans la base de données')
//   }
// })
// }
exports.getCourseBySigle = (req, res) => {
  const { sigle } = req.params;
  const sqlQuery = 'SELECT * FROM cours WHERE sigleCours = ?';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération du cours');
      }
      connection.query(sqlQuery, [sigle], (err, result) => {
          connection.release();
          if (err) {
              res.status(500).send('Erreur lors de la récupération du cours');
          } else if (result.length > 0) {
              res.status(200).send(result);
          } else {
              res.status(404).send('Cours non trouvé dans la base de données');
          }
      });
  });
};

//Récupérer un cours par id
// exports.getCourseById = (req, res) => 
// {
//   const { id } = req.params;

 
//   const sql = `SELECT * FROM cours WHERE idCours = ?`;
//   db.query(sql, [id], (err, result)=>
// {
  
//   if(result.length > 0)
//   {
//     res.status(200).send(result);
//     console.log(result);
//   }
//   else
//   {
//     res.status(404).send('Cours non trouvé dans la base de données')
//   }
// })
// }
exports.getCourseById = (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM cours WHERE idCours = ?';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération du cours');
      }
      connection.query(sqlQuery, [id], (err, result) => {
          connection.release();
          if (err) {
              res.status(500).send('Erreur lors de la récupération du cours');
          } else if (result.length > 0) {
              res.status(200).send(result);
          } else {
              res.status(404).send('Cours non trouvé dans la base de données');
          }
      });
  });
};


// Récupérer les cours actifs
// exports.getActifCoursesData = (req, res) =>
// {
//   const sql = `SELECT * FROM cours WHERE statut = true`;
//   db.query(sql, (err, result) =>
// {
//   console.log(result);
//   res.send(result);
// });
// }
exports.getActifCoursesData = (req, res) => {
  const sqlQuery = 'SELECT * FROM cours WHERE statut = true';

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération des cours actifs');
      }
      connection.query(sqlQuery, (err, result) => {
          connection.release();
          if (err) {
              res.status(500).send('Erreur lors de la récupération des cours actifs');
          } else {
              res.status(200).send(result);
          }
      });
  });
};
    

//Recupérer les cours  selon la recherche
// exports.getCoursesData = (req, res) =>
// {
//     const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
//     const idFiliere = req.query.idFiliere; // Récupérer la valeur de idFiliere depuis la requête
//     const idProf = req.query.idProf;
//     const niveau = req.query.niveau;
//     let sqlQuery = 'SELECT * FROM cours WHERE statut = true';
  
//     // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
//     if (searchText) {
//       sqlQuery += ` AND nomCours LIKE '%${searchText}%' `;
//     }

//     if(idFiliere)
//     {
//       sqlQuery += ` AND idFiliere = ${idFiliere} `;
//     }
//     if(idProf)
//     {
//       sqlQuery += ` AND idProfesseur = '${idProf}' `;
//     }
//     if(niveau)
//     {
//       sqlQuery += ` AND niveau LIKE '%${niveau}%' `;
//     }
//     console.log(sqlQuery);
//     // Exécuter la requête SQL
//     db.query(sqlQuery, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de la récupération des cours');
//       } else {
//         res.status(200).json(result);
//         console.log(result);
//       }
//     });
  
// }
exports.getCoursesData = (req, res) => {
  const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
  const idFiliere = req.query.idFiliere; // Récupérer la valeur de idFiliere depuis la requête
  const idProf = req.query.idProf;
  const niveau = req.query.niveau;
  let sqlQuery = 'SELECT * FROM cours WHERE statut = true';

  // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
  if (searchText) {
      sqlQuery += ` AND nomCours LIKE '%${searchText}%' `;
  }

  if (idFiliere) {
      sqlQuery += ` AND idFiliere = ${idFiliere} `;
  }
  if (idProf) {
      sqlQuery += ` AND idProfesseur = '${idProf}' `;
  }
  if (niveau) {
      sqlQuery += ` AND niveau LIKE '%${niveau}%' `;
  }

  console.log(sqlQuery);

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error getting connection from pool:', err);
          return res.status(500).send('Erreur lors de la récupération des cours');
      }
      connection.query(sqlQuery, (err, result) => {
          connection.release();
          if (err) {
              res.status(500).send('Erreur lors de la récupération des cours');
          } else {
              res.status(200).json(result);
              console.log(result);
          }
      });
  });
};
