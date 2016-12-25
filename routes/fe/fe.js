module.exports = function(app) {

  app.get('/fe/danmu', function(req, res) {
    res.render('fe/danmu', {layout: false});
  });

  app.get('/fe/jscalculator', function(req, res) {
    res.render('fe/jscalculator', {layout: false});
  });

  app.get('/fe/localweather', function(req, res) {
    res.render('fe/localweather', {layout: false});
  });

  app.get('/fe/pomodorotimer', function(req, res) {
    res.render('fe/pomodorotimer', {layout: false});
  });

  app.get('/fe/quote', function(req, res) {
    res.render('fe/quote', {layout: false});
  });

  app.get('/fe/simongame', function(req, res) {
    res.render('fe/simongame', {layout: false});
  });

  app.get('/fe/tictactoe', function(req, res) {
    res.render('fe/tictactoe', {layout: false});
  });

  app.get('/fe/Tribute-Page', function(req, res) {
    res.render('fe/Tribute-Page', {layout: false});
  });

  app.get('/fe/twitchviewer', function(req, res) {
    res.render('fe/twitchviewer', {layout: false});
  });

  app.get('/fe/Webpage', function(req, res) {
    res.render('fe/Webpage', {layout: false});
  });

  app.get('/fe/wikiviewer', function(req, res) {
    res.render('fe/wikiviewer', {layout: false});
  });

};
