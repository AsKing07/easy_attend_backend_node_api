const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const seanceRoutes = require('./routes/seance');

const filiereRoutes = require('./routes/filiere');
const coursRoutes = require('./routes/cours');
const requeteRoutes = require('./routes/requete');
const profRoutes = require('./routes/prof');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/api/student',  studentRoutes);
app.use('/api/teacher',  seanceRoutes);

app.use('/api/filiere', filiereRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/prof', profRoutes);
app.use('/api/requete', requeteRoutes);
app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

