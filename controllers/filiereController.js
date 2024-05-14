const db = require('../config/db');


//Creer une filiere 
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


  //Mettre à jour une filière  
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
    let   sqlQuery = 'UPDATE filiere SET statut = 0';
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
     let sqlQuery = 'UPDATE filiere SET statut = false WHERE idFiliere = ?';
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
    let  sqlQuery = 'UPDATE filiere SET statut = true WHERE idFiliere = ?';
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


    //GET METHODES

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
        
          const searchText = req.query.search; // Récupérer la valeur de searchText depuis la requête
        
          let sqlQuery = 'SELECT * FROM filiere WHERE statut = true';
        
          // Si le champ de recherche n'est pas vide, ajouter la clause WHERE pour filtrer les résultats
          if (searchText) {
            sqlQuery += ` AND nomFiliere LIKE '%${searchText}%' `;
          }
        
          // Exécuter la requête SQL
          db.query(sqlQuery, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send('Erreur lors de la récupération des filières');
            } else {
              res.status(200).json(result);
              console.log(result);
            }
          });
        
      }
