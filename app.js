const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth-routes');
const { use } = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
