const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//    786945232551-em5kkb2tmvnpj7neg7h8g2jvcjvdhdm0.apps.googleusercontent.com
//     tKg6Zt1Pz1Sl0A2rK7Dm7DTm
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  () => {
    console.log('passport callback');
  }
);
