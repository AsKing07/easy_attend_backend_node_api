const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const globalRoutes = require('./routes/global');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/admin', adminRoutes);
// app.use('/api/student',  studentRoutes);
app.use('/api/teacher',  teacherRoutes);
app.use('/api/global', globalRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
