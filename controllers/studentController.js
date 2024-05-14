const db = require('../config/db');


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
     let sqlQuery = 'UPDATE student SET statut = 0';
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
     let sqlQuery = 'UPDATE student SET statut = 0 WHERE idFiliere = ?';
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
     let sqlQuery = 'UPDATE student SET statut = 1 WHERE idFiliere = ?';
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
       let  sqlQuery = 'UPDATE student SET statut = true WHERE uid = ?';
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
    let  sqlQuery = 'UPDATE student SET statut = false WHERE uid = ?';
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



    exports.getStudentByMatricule = (req, res) => {
        console.log(req.query)
          const  matricule  = req.query.matricule;
          console.log(matricule);
          let id;
          if(req.query.id)
          {
            id = req.query.id;
      
          }
          
       let sql;
          // Vérifier si l'utilisateur existe dans la base de données SQL
          if(id)
          {
             sql = `SELECT * FROM student WHERE matricule = ? AND uid = '${id}'`;
      
          }
          else
          {
             sql = 'SELECT * FROM student WHERE matricule = ?';
      
          }
          db.query(sql, [matricule], (err, result) => {
            if (err) throw err;
      console.log(result);
       
            if (result.length > 0) {
              // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
              res.send(result[0]);
            } else {
              // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
              res.status(404).send('Student not found in SQL database');
      
              
            }
          });
        };
      exports.getStudentById = (req, res) => {
          const { id } = req.params;
        console.log(req.params)
          // Vérifier si l'utilisateur existe dans la base de données SQL
          const sql = 'SELECT * FROM student WHERE uid = ?';
          db.query(sql, [id], (err, result) => {
            if (err) throw err;
      console.log(result);
      if(result)
      {
        console.log(result.length);
      
      }
            if (result.length > 0) {
              // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
              res.send(result[0]);
            } else {
              // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
              res.status(404).send('Student not found in SQL database');
      
              
            }
          });
        };
      
      
        exports.getActifStudentData = (req, res) =>
        {
          const sql = `SELECT * FROM student WHERE statut = true`;
      
          db.query(sql, (err, result) =>
        {
          console.log(result);
          res.send(result);
        });
      
        }  
        exports.getInactifStudentData = (req, res) =>
        {
          const sql = `SELECT * FROM student WHERE statut = false`;
      
          db.query(sql, (err, result) =>
        {
          console.log(result);
          res.send(result);
        });
      
        }  
        
        exports.getStudentData = (req, res) =>
        {
          const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
          const idFiliere = req.query.idFiliere; // Récupérer la valeur de idFiliere depuis la requête
          const niveau = req.query.niveau;
        
          let sqlQuery = `SELECT * FROM student WHERE statut = true`;
          if (searchText) {
            sqlQuery += ` AND (nom LIKE '%${searchText}%' OR prenom LIKE '%${searchText}' OR matricule LIKE '%${searchText}%')`;
          }
      
          if(idFiliere)
          {
            sqlQuery += ` AND idFiliere = ${idFiliere} `;
          }
      
          if(niveau)
          {
            sqlQuery += ` AND niveau LIKE '%${niveau}%' `;
          }
        
          console.log(sqlQuery);
      
          db.query(sqlQuery, (err, result) =>
        {
          console.log(result);
          res.send(result);
        });
      
        }  
  