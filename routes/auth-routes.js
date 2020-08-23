const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.send('logging out');
});

// auth with google
router.get('/google', (req, res) => {
  res.send('logging in with google');
});

module.exports = router;
