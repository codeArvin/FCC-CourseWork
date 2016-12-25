var func = require('../../lib/URLshorterfunc.js');

module.exports = function(app) {

  app.get('/api/URLshorter', function(req, res) {
    var css = '/css/URLshorter.css';
  	res.render('api/URLshorter', {
      title: 'URL Shortener Microservice',
      CSS : css
    });
  });

  app.get('/api/URLshorter/:id', function(req, res) {
  	var id = req.params.id;
    func.findUrl(id, res);
  });

  app.get('/api/URLshorter/new/:url', function(req, res) {
  	var url = 'http://' + req.params.url;
    var host = req.headers.host;
  	if (func.isFormat(url)) {
  		func.Urlshorter(url, host, res);
  	} else {
  		res.send('ERROR: URL is not confirm format');
  	}
  });
};
