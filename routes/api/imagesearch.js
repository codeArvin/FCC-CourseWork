var imagesearch = require('../../lib/imagesearchfunc.js');

module.exports = function(app) {

  app.get('/api/imagesearch', function(req, res) {
    res.render('api/imagesearch', {
      title: 'Image Search Abstraction Layer'
    });
  });

  app.get('/api/imagesearch/search/:keywords', function(req, res) {
    var time = new Date();
    imagesearch.updateList(req.params.keywords, time);
    res.send('keywords: ' + req.params.keywords + '<br/>offset: ' + req.query.offset);
  });

  app.get('/api/imagesearch/latest', function(req, res) {
    imagesearch.showList(res);
  });

};
