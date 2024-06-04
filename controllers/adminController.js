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
        if (err) 
          {
            res.status(500).send(`${err.message}`);

          }
          else
          {
            res.send('Admin added to SQL database');

          }
          
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
      if (err) {
        res.status(500).send(err);
      };
  
      if (result.length > 0) {
        // L'utilisateur existe dans la base de données SQL, renvoyer ses informations
        res.send(result[0]);
      } else {
        // L'utilisateur n'existe pas dans la base de données SQL, renvoyer une erreur
        res.status(404).send('User not found in SQL database');
        
      }
    });
  };
  















    

