module.exports = (app, passport) => {

  app.get('/',function(req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  //     res.render('profile', { user: req.user });
  //   });
}
