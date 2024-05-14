
const db = require('../config/db');

exports.updateSeancePresence = (req, res) =>{

const seanceId = req.body.idSeance;
const presence = req.body.presenceEtudiant;

console.log(req.body);


const sqlQuery= "UPDATE seance SET presenceEtudiant = ?, presenceTookOnce = ? WHERE idSeance =? ";
db.query(sqlQuery, [JSON.stringify(presence), true, seanceId], (err, result) =>{
    console.log(sqlQuery);


    if (err) {
        res.status(500).send(`Erreur: ${err}`);

    }
    else
    {
    res.status(200).send('Présence enregistrée avec succès');
    }
  
}) 

}


exports.createSeance = (req, res) => {
    const seanceData = req.body;

    // Extraire les données JSON du corps de la requête
    console.log(seanceData);
    const dateSeance = seanceData.dateSeance;
    const idCours = seanceData.idCours;
    const isActive = seanceData.isActive;
    const presenceEtudiant = seanceData.presenceEtudiant;
    const presenceTookOnce = seanceData.presenceTookOnce;
    const seanceCode = seanceData.seanceCode;
  
    // Insérer les données dans la table seance de la base de données SQL
    const query = `
      INSERT INTO seance (dateSeance, idCours, isActive, presenceEtudiant, presenceTookOnce, seanceCode)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [dateSeance, idCours, isActive, JSON.stringify(presenceEtudiant), presenceTookOnce, seanceCode], (err, result) => {
      if (err) throw err;
      res.status(200).send('Séance enregistrée avec succès');
    });
  }

  exports.updateSeanceStatus = (req, res) =>
  {
    const {idSeance, action } = req.body;
    let sqlQuery;
      switch (action) {
        case "start":
          sqlQuery = "UPDATE seance SET isActive = true WHERE idSeance = ?";
    
          break;
    
        case "stop" :
           sqlQuery = 'UPDATE seance SET isActive = false  WHERE idSeance = ?';
    
        break;
    
      }
      db.query(sqlQuery, [idSeance], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la modification');
          } else {
            res.status(200).send(result);
    //        console.log(result);
          }
      })
  }
  exports.deleteSeance = (req, res) =>
  {
    const {idSeance} = req.params;
    let sqlQuery = "DELETE FROM  seance WHERE idSeance = ? ";
    db.query(sqlQuery, [idSeance], (err, result) =>
{
    console.log(sqlQuery);
    if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression');
      } else {
        res.status(200).send(result);
        console.log(result);
      }
})
    
         
  }



  exports.getSeanceData = (req, res) =>
{
  {
    
    const idCours = req.query.idCours; 
   
    let sqlQuery = 'SELECT * FROM seance  ';

    
  

    if (idCours) {
      sqlQuery += ` WHERE idCours = ${idCours} `;
    }

    sqlQuery += ' ORDER BY   dateSeance DESC ';

  
  
    console.log(sqlQuery);
    // Exécuter la requête SQL
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des cours');
      } else {
        res.status(200).json(result);
    //    console.log(result);
      }
    });
  }
}