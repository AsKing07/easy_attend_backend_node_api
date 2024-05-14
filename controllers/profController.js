const db = require('../config/db');

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
  let   sqlQuery = 'UPDATE prof SET statut = 0';
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
   


     exports.getActifProfData = (req, res) =>
     {
       const sql = `SELECT * FROM prof WHERE statut = true`;
   
       db.query(sql, (err, result) =>
     {
       console.log(result);
       res.send(result);
     });
   
     }  
     exports.getInactifProfData = (req, res) =>
     {
       const sql = `SELECT * FROM prof WHERE statut = false`;
   
       db.query(sql, (err, result) =>
     {
       console.log(result);
       res.send(result);
     });
   
     }  
   
         //Recupérer les profs actifs selon la recherche
         exports.getProfData = (req, res) =>
         {
           
             const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
             const filtre = req.query.filtre; // Récupérer la valeur du filtre depuis la requête
           
             let sqlQuery = 'SELECT * FROM prof WHERE statut = true';
           
             // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
             if (searchText && filtre == "Nom") {
               sqlQuery += ` AND nom LIKE '%${searchText}%' `;
             }
             else if(searchText && filtre == "Prenom")
             {
               sqlQuery += ` AND prenom LIKE '%${searchText}%' `;
             }
           
             // Exécuter la requête SQL
             db.query(sqlQuery, (err, result) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Erreur lors de la récupération des profs');
               } else {
                 res.status(200).json(result);
                 console.log(result);
               }
             });
           
         }
     
         exports.getProfById = (req, res) => 
         {
           const { id } = req.params;
       
           console.log(id);
           const sql = `SELECT * FROM prof WHERE uid = ?`;
           db.query(sql, [id], (err, result)=>
         {
           if(result.length > 0)
           {
             res.status(200).send(result[0]);
           }
           else
           {
             res.status(404).send('Prof non trouvée dans la base de données')
           }
         })
         }
       
   