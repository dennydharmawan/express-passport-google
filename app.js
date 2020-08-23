require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile');

const app = express();

app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
