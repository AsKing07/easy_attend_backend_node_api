const db = require('../config/db');

exports.createAdmin = (req, res) => {
  const { uid, email, nom, prenom, phone } = req.body;
  console.log(req.body);

  // Vérifier si l'utilisateur existe déjà dans la base de données SQL
  const sql = 'SELECT * FROM admin WHERE uid = ?';
  db.query(sql, [uid], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // L'utilisateur existe déjà dans la base de données SQL
      res.send('Asmin already exists in SQL database');
    } else {
      // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
      const sql = 'INSERT INTO admin (uid, email, nom, prenom, phone) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [uid, email, nom, prenom, phone], (err, result) => {
        if (err) throw err;
        res.send('Admin added to SQL database');
      });
    }
  });
};

exports.getAdmin = (req, res) => {
    const { uid } = req.params;
  console.log(req.params)
    // Vérifier si l'utilisateur existe dans la base de données SQL
    const sql = 'SELECT * FROM admin WHERE uid = ?';
    db.query(sql, [uid], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
        res.send(result[0]);
      } else {
        // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
        res.status(404).send('User not found in SQL database');
        
      }
    });
  };
  

  //Prof Méthodes

  exports.createProf = (req, res) => {
    const { uid, email, nom, prenom, phone } = req.body;
    console.log(req.body);
  
    // Vérifier si l'utilisateur existe déjà dans la base de données SQL
    const sql = 'SELECT * FROM prof WHERE uid = ?';
    db.query(sql, [uid], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        // L'utilisateur existe déjà dans la base de données SQL
        res.send('Teacher already exists in SQL database');
      } else {
        // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
        const sql = 'INSERT INTO prof (uid, email, nom, prenom, phone, statut) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [uid, email, nom, prenom, phone, true], (err, result) => {
          if (err) throw err;
          res.send('Teacher added to SQL database');
        });
      }
    });
  };

    //Modifier Prof
    exports.updateProfById = (req, res) => {
      const {uid, nom, prenom, phone } = req.body;
     
      const sqlQuery = 'UPDATE prof SET nom = ?, prenom = ?, phone = ?WHERE uid = ? ';
      db.query(sqlQuery, [nom, prenom, phone, uid], (err, result) =>{
        if (err) throw err;
        res.status(200).send('Prof modifié avec succès');
      });
    }

   //Supprimer tous les profs
   exports.deleteAllProfs = (req, res) =>
   {
     sqlQuery = 'UPDATE prof SET statut = 0';
       // Exécuter la requête SQL
       db.query(sqlQuery, (err, result) => {
         if (err) {
           console.error(err);
           res.status(500).send('Erreur lors de la suppression des professeurs');
         } else {
           res.status(200).json(result);
           console.log(result);
         }
       });
   }

        //Restaurer un etudiant par id
        exports.restaureProfById = (req, res) =>
        {
          const { id } = req.params;
          sqlQuery = 'UPDATE prof SET statut = true WHERE uid = ?';
            // Exécuter la requête SQL
            db.query(sqlQuery, [id], (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de la restauration du prof');
              } else {
                res.status(200).json(result);
                console.log(result);
              }
            });
        }
    
      //Supprimer un prof par id
     exports.deleteProfById = (req, res) =>
     {
       const { id } = req.params;
       sqlQuery = 'UPDATE prof SET statut = false WHERE uid = ?';
         // Exécuter la requête SQL
         db.query(sqlQuery, [id], (err, result) => {
           if (err) {
             console.error(err);
             res.status(500).send('Erreur lors de la suppression du professeur');
           } else {
             res.status(200).json(result);
             console.log(result);
           }
         });
     }
   


  //Student Méthodes

  exports.createStudent = (req, res) => {
    const { uid, email, nom, prenom, phone,matricule, idFiliere, filiere, niveau } = req.body;
    console.log(req.body);
  
    // Vérifier si l'utilisateur existe déjà dans la base de données SQL
    const sql = 'SELECT * FROM student WHERE uid = ?';
    db.query(sql, [uid], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        // L'utilisateur existe déjà dans la base de données SQL
        res.send('Student already exists in SQL database');
      } else {
        // L'utilisateur n'existe pas dans la base de données SQL, l'ajouter
        const sql = 'INSERT INTO student (uid, email, nom, prenom, phone, statut, matricule, idFiliere, filiere, niveau) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [uid, email, nom, prenom, phone, true, matricule, idFiliere,filiere, niveau], (err, result) => {
          if (err) throw err;
          res.send('Student added to SQL database');
        });
      }
    });
  };

  //Modifier Etudiant
  exports.updateStudentById = (req, res) => {
    const {uid, nom, prenom, phone, matricule, filiere, idFiliere, niveau } = req.body;
   
    const sqlQuery = 'UPDATE student SET nom = ?, prenom = ?, phone = ?, matricule = ?, filiere = ?, idFiliere = ?, niveau = ? WHERE uid = ? ';
    db.query(sqlQuery, [nom, prenom, phone, matricule, filiere, idFiliere, niveau, uid], (err, result) =>{
      console.log(sqlQuery);

      if (err)
      {
        res.status(500).send("");
        console.log(err);

      }
      else
      {
        res.status(200).send('Etudiant modifiée avec succès');

      }

    });
  }

   //Supprimer tous les étudiants
   exports.deleteAllStudents = (req, res) =>
   {
     sqlQuery = 'UPDATE student SET statut = 0';
       // Exécuter la requête SQL
       db.query(sqlQuery, (err, result) => {
         if (err) {
           console.error(err);
           res.status(500).send('Erreur lors de la suppression des étudiants');
         } else {
           res.status(200).json(result);
           console.log(result);
         }
       });
   }

   //Supprimer  les étudiants d'une filière
   exports.deleteStudentsByFiliere = (req, res) =>
   {
     const {filiereId } = req.params;
     sqlQuery = 'UPDATE student SET statut = 0 WHERE idFiliere = ?';
       // Exécuter la requête SQL
       db.query(sqlQuery, [filiereId], (err, result) => {
         if (err) {
           console.error(err);
           res.status(500).send('Erreur lors de la suppression des étudiants');
         } else {
           res.status(200).json(result);
           console.log(result);
         }
       });
   }
   //Supprimer  les étudiants d'une filière
   exports.restaureStudentsByFiliere = (req, res) =>
   {
     const {filiereId } = req.params;
     sqlQuery = 'UPDATE student SET statut = 0 WHERE idFiliere = ?';
       // Exécuter la requête SQL
       db.query(sqlQuery, [filiereId], (err, result) => {
         if (err) {
           console.error(err);
           res.status(500).send('Erreur lors de la suppression des étudiants');
         } else {
           res.status(200).json(result);
           console.log(result);
         }
       });
   }

       //Restaurer un etudiant par id
       exports.restaureStudentById = (req, res) =>
       {
         const { id } = req.params;
         sqlQuery = 'UPDATE student SET statut = true WHERE uid = ?';
           // Exécuter la requête SQL
           db.query(sqlQuery, [id], (err, result) => {
             if (err) {
               console.error(err);
               res.status(500).send('Erreur lors de la restauration de l\'étudiant');
             } else {
               res.status(200).json(result);
               console.log(result);
             }
           });
       }
   
           //Supprimer un etudiant par id
    exports.deleteStudentById = (req, res) =>
    {
      const { id } = req.params;
      sqlQuery = 'UPDATE student SET statut = false WHERE uid = ?';
        // Exécuter la requête SQL
        db.query(sqlQuery, [id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression de l\'étudiant');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }
  


  //Filière Méthode

  exports.createFiliere = (req, res) => {
    const { nomFiliere, sigleFiliere, niveaux, statut } = req.body;
    console.log(req.body);
  
    // Vérifier si l'utilisateur existe déjà dans la base de données SQL
    const sql = 'SELECT * FROM filiere WHERE sigleFiliere = ?';
    db.query(sql, [sigleFiliere], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        // La filière existe déjà dans la base de données SQL
        res.send('Une filière avec le même sigle existe déjà');
      } else {

        let allNiveaux = niveaux.join(',');
        // La filière n'existe pas dans la base de données SQL, l'ajouter
        const sql = 'INSERT INTO filiere (nomFiliere, sigleFiliere, niveaux, statut) VALUES (?, ?, ?, ?)';
        db.query(sql, [nomFiliere, sigleFiliere, allNiveaux, statut], (err, result) => {
          if (err) throw err;
          res.send('Filière ajoutée avec succès');
        });
      }
    });
  };

  exports.updateFiliereById = (req, res) => {
    const {idFiliere, nomFiliere, sigleFiliere, niveaux } = req.body;
    let allNiveaux = niveaux.join(',');
    const sqlQuery = 'UPDATE filiere SET nomFiliere = ?, sigleFiliere = ?, niveaux = ? WHERE idFiliere = ? ';
    db.query(sqlQuery, [nomFiliere, sigleFiliere, allNiveaux, idFiliere], (err, result) =>{
      if (err) throw err;
      res.status(200).send('Filière modifiée avec succès');
    });
  }
  
    //Supprimer tous les filieres
    exports.deleteAllFilieres = (req, res) =>
    {
      sqlQuery = 'UPDATE filiere SET statut = 0';
        // Exécuter la requête SQL
        db.query(sqlQuery, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression des filières');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }
  
    //Supprimer une filiere par id
    exports.deleteFiliereById = (req, res) =>
    {
      const { id } = req.params;
      sqlQuery = 'UPDATE filiere SET statut = false WHERE idFiliere = ?';
        // Exécuter la requête SQL
        db.query(sqlQuery, [id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression de la filière');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }
  
    //Restaurer une filiere par id
    exports.restaureFiliereById = (req, res) =>
    {
      const { id } = req.params;
      sqlQuery = 'UPDATE filiere SET statut = true WHERE idFiliere = ?';
        // Exécuter la requête SQL
        db.query(sqlQuery, [id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la restauration de la filière');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }

    

  //Cours
    //Supprimer tous les cours
    exports.deleteAllCourses = (req, res) =>
    {
      sqlQuery = 'UPDATE cours SET statut = 0';
        // Exécuter la requête SQL
        db.query(sqlQuery, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression des cours');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }
    //Supprimer tous les cours d'une filiere
    exports.deleteCoursesByFiliere = (req, res) =>
    {
      const {filiereId} = req.params;
      sqlQuery = 'UPDATE cours SET statut = 0 WHERE idFiliere = ?';
        // Exécuter la requête SQL
        db.query(sqlQuery,[filiereId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression des cours associés');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }

    //Restaurer les cours d'une filière
    exports.restaureCoursesByFiliere = (req, res) =>
    {
      const {filiereId} = req.params;
      sqlQuery = 'UPDATE cours SET statut = 1 WHERE idFiliere = ?';
        // Exécuter la requête SQL
        db.query(sqlQuery,[filiereId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la restauration des cours associés');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
    }
    //Supprimer un cours
    // Supprimer un cours par id
    exports.deleteCourseById = (req, res) => {
      const { id } = req.params;
      const sqlQuery = 'DELETE  FROM cours WHERE idCours = ?';
      // Exécuter la requête SQL
      db.query(sqlQuery, [id], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la suppression du cours');
        } else {
          res.status(200).send(result);
          console.log(result);
        }
      });
    }


  //Creer cours
  exports.createCourse = (req, res) =>
  {
    const {nomCours, sigleCours, niveau, idProfesseur, idFiliere} = req.body;


    // Vérifier si l'utilisateur existe déjà dans la base de données SQL
    const sql = 'SELECT * FROM cours WHERE sigleCours = ?';
    db.query(sql, [sigleCours], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        // Le cours existe déjà dans la base de données SQL
        res.send({
          "message": "Un cours avec le même sigle(identifiant) existe déjà",
          result
          
        })
      } else {

        
        // Le cours n'existe pas dans la base de données SQL, l'ajouter
        sqlQuery = 'INSERT INTO cours (nomCours, sigleCours, niveau, idProfesseur, idFiliere, statut) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sqlQuery, [nomCours, sigleCours, niveau, idProfesseur, idFiliere, true], (err, result) =>{
          if (err)
          {
            res.send('Erreur lors de la création du cours')
            throw err;
          }
          else
          {
            res.send("Cours ajouté avec succès!")
          }
        })
      }
    });

    
  }

  exports.updateCourseById = (req, res) => {
    const {idCours, nomCours, sigleCours, niveau, idFiliere, idProfesseur } = req.body;
    const sqlQuery = 'UPDATE cours SET nomCours = ?, sigleCours = ?, niveau = ?, idFiliere = ?, idProfesseur = ? WHERE idCours = ? ';
    db.query(sqlQuery, [nomCours, sigleCours, niveau, idFiliere,idProfesseur, idCours  ], (err, result) =>{
      if (err) throw err;
      res.status(200).send('Cours modifié avec succès');
    });
  }
  
  //Requete

  exports.updateRequesteStatus =(req, res) =>{
    const {idRequete, action } = req.body;
let sqlQuery;
  switch (action) {
    case "Approuver":
      sqlQuery = "UPDATE requete SET statut = '1' ";

      break;

    case "Attente" :
       sqlQuery = 'UPDATE requete SET statut = "2"';

    break;

    case "Refuser" :
       sqlQuery = 'UPDATE requete SET statut = "0"';

    break;

    
    // default:

    //   break;

  }

  
  db.query(sqlQuery, (err, result) =>{
    console.log(sqlQuery);
    if (err)
    {
      res.status(500).send('Une erreur s\'est produite');

    }
    else
    {
      res.status(200).send('Requete modifié avec succès');

    }
  });

  }
