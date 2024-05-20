const db = require('../config/db');


exports.createRequest = (req, res) => {
    const { idAuteur, type, sujet, details, statut, dateCreation } = req.body;
    let sqlQuery;
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
  }; 
  
  //Recupérer les requêtes selon la recherche
      exports.getRequestData = (req, res) =>
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
      exports.getUnsolvedRequestData = (req, res) =>
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
  
      exports.getRequestByUserId = (req, res) => {
        const { id } = req.params;
      console.log(req.params)
        const sql = 'SELECT * FROM requete WHERE idAuteur = ?';
        db.query(sql, [id], (err, result) => {
          if (err) 
          {
            console.log(err);
            res.status(500).send('Error while getting Request');

          }
          else
          {
            console.log(result);
                if (result.length > 0) {
            res.send(result[0]);
          } else {
            res.send(result);
    
            
          }
          }
   
    // if(result)
    // {
    //   console.log(result.length);
    

    // }
      //     if (result.length > 0) {
      //       res.send(result[0]);
      //     } else {
      //       res.status(404).send('Request not found in SQL database');
    
            
      //     }
       });
       };
  

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
    
      sqlQuery += `WHERE idRequete = ${idRequete}`
      
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
    