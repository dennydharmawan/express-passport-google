const passport = require('passport');

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google/callback', passport.authenticate('google'), function (
  req,
  res
) {
  res.redirect('/profile');
  //res.send(req.user);
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

module.exports = router;
