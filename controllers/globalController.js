const db = require('../config/db');

//ETUDIANTS
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
       sql = `SELECT * FROM student WHERE matricule = ? AND id != ${id}`;

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
  
  
   
  //FILIERES
  exports.getFiliereBySigle = (req, res) => 
  {
    const { sigle } = req.params;

    console.log(sigle);
    const sql = `SELECT * FROM filiere WHERE sigleFiliere = ?`;
    db.query(sql, [sigle], (err, result)=>
  {
    if(result.length > 0)
    {
      res.status(200).send(result);
    }
    else
    {
      res.status(404).send('Filière non trouvée dans la base de données')
    }
  })
  }
  exports.getFiliereByName = (req, res) => 
  {
    const { nom } = req.params;

    console.log(nom);
    const sql = `SELECT * FROM filiere WHERE nomFiliere LIKE '%${nom}%'`;
    db.query(sql, (err, result)=>
  {console.log(sql);
    console.log(result);
    if(result.length > 0)
    {
      res.status(200).send(result);
    }
    else
    {
      res.status(404).send('Filière non trouvée dans la base de données')
    }
  })
  }
  exports.getFiliereById = (req, res) => 
  {
    const { id } = req.params;

    console.log(id);
    const sql = `SELECT * FROM filiere WHERE idFiliere = ?`;
    db.query(sql, [id], (err, result)=>
  {
    if(result.length > 0)
    {
      res.status(200).send(result);
    }
    else
    {
      res.status(404).send('Filière non trouvée dans la base de données')
    }
  })
  }

  exports.getActifFiliereData = (req, res) =>
  {
    const sql = `SELECT * FROM filiere WHERE statut = true`;

    db.query(sql, (err, result) =>
  {
    console.log(result);
    res.send(result);
  });

  }
  exports.getInactifFiliereData = (req, res) =>
  {
    const sql = `SELECT * FROM filiere WHERE statut = false`;

    db.query(sql, (err, result) =>
  {
    console.log(result);
    res.send(result);
  });

  }

    //Recupérer les filières actives selon la recherche
    exports.getFiliereData = (req, res) =>
    {
      {
        const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
      
        let sqlQuery = 'SELECT * FROM filiere WHERE statut = true';
      
        // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
        if (searchText) {
          sqlQuery += ` AND nomFiliere LIKE '%${searchText}%' `;
        }
      
        // Exécuter la requête SQL
        db.query(sqlQuery, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des filières');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
      }
    }

  //PROF
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
    
//COURS

exports.getCourseBySigle = (req, res) => 
{
  const { sigle } = req.params;

  console.log(sigle);
  const sql = `SELECT * FROM cours WHERE sigleCours = ?`;
  db.query(sql, [sigle], (err, result)=>
{
  if(result.length > 0)
  {
    res.status(200).send(result);
  }
  else
  {
    res.status(404).send('Cours non trouvé dans la base de données')
  }
})
}
exports.getCourseById = (req, res) => 
{
  const { id } = req.params;

 
  const sql = `SELECT * FROM cours WHERE idCours = ?`;
  db.query(sql, [id], (err, result)=>
{
  
  if(result.length > 0)
  {
    res.status(200).send(result);
    console.log(result);
  }
  else
  {
    res.status(404).send('Cours non trouvé dans la base de données')
  }
})
}

exports.getActifCoursesData = (req, res) =>
{
  const sql = `SELECT * FROM cours WHERE statut = true`;

  db.query(sql, (err, result) =>
{
  console.log(result);
  res.send(result);
});

}
    

//Recupérer les cours  selon la recherche
exports.getCoursesData = (req, res) =>
{
  {
    const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
    const idFiliere = req.query.idFiliere; // Récupérer la valeur de idFiliere depuis la requête
    const idProf = req.query.idProf;
    const niveau = req.query.niveau;
    let sqlQuery = 'SELECT * FROM cours WHERE statut = true';
  
    // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
    if (searchText) {
      sqlQuery += ` AND nomCours LIKE '%${searchText}%' `;
    }

    if(idFiliere)
    {
      sqlQuery += ` AND idFiliere = ${idFiliere} `;
    }
    if(idProf)
    {
      sqlQuery += ` AND idProfesseur = '${idProf}' `;
    }
    if(niveau)
    {
      sqlQuery += ` AND niveau LIKE '%${niveau}%' `;
    }
  
    console.log(sqlQuery);
    // Exécuter la requête SQL
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des cours');
      } else {
        res.status(200).json(result);
        console.log(result);
      }
    });
  }
}


//requete
exports.createRequest = (req, res) => {
  const { idAuteur, type, sujet, details, statut, dateCreation } = req.body;
  var sqlQuery;
  sqlQuery = `SELECT * FROM requete WHERE idAuteur = ?`;
  db.query(sqlQuery, [idAuteur], (err, result) => {
    console.log(sqlQuery);
    if (err) {
      console.log(err);
      return res.status(500).send("");
    } else {
      if (result.length > 0) {
        sqlQuery = `UPDATE requete SET type = ?, sujet = ?, details = ?, statut = ?, dateCreation = ? WHERE idAuteur = ?`;
        db.query(sqlQuery, [type, sujet, details, "2", dateCreation, idAuteur], (err, updateResult) => {
          console.log(sqlQuery);
          if (err) {
            console.log(err);
            return res.status(500).send("");
          } else {
            return res.status(200).send("Requete mise à jour");
          }
        });
      } else {
        sqlQuery = "INSERT INTO requete(idAuteur, type, sujet, details, statut, dateCreation) VALUES(?, ?, ?, ?, ?, ?)";
        db.query(sqlQuery, [idAuteur, type, sujet, details, "2", dateCreation], (err, insertResult) => {
          if (err) {
            console.log(err);
            return res.status(500).send("");
          } else {
            return res.status(200).send("Requete créée");
          }
        });
      }
    }
  });
}; //Recupérer les requêtes selon la recherche
    exports.getRequestData = (req, res) =>
    {
      {
        const filtre = req.query.filtre; // Récupérer la valeur du filtre depuis la requête
      
        let sqlQuery = 'SELECT * FROM requete ';
      
        if (filtre) {
          sqlQuery += ` WHERE statut = '${filtre}' `;
        }
      
        // Exécuter la requête SQL
        db.query(sqlQuery, (err, result) => {
          console.log(sqlQuery);
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des requêtes');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
      }
    }
    exports.getUnsolvedRequestData = (req, res) =>
    {
      {
      
        let sqlQuery = 'SELECT * FROM requete WHERE statut = "2"';
      
      
        // Exécuter la requête SQL
        db.query(sqlQuery, (err, result) => {
          console.log(sqlQuery);
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des requêtes');
          } else {
            res.status(200).json(result);
            console.log(result);
          }
        });
      }
    }

    exports.getRequestById = (req, res) => {
      const { id } = req.params;
    console.log(req.params)
      const sql = 'SELECT * FROM requete WHERE idRequete = ?';
      db.query(sql, [id], (err, result) => {
        if (err) throw err;
  console.log(result);
  if(result)
  {
    console.log(result.length);
  
  }
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.status(404).send('Request not found in SQL database');
  
          
        }
      });
    };


