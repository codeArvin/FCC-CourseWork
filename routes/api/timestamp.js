module.exports = function(app) {

  app.get('/api/timestamp', function(req, res) {
    var css = '/css/timestamp.css';
  	res.render('api/timestamp', {
      // this should has two params
      // title : the web title
      // CSS : the page css place, if don't have, don't write it
      title: 'Timestamp Microservice',
      CSS: css
    });
  });

  app.get('/api/timestamp/*', function(req, res) {
  	var param = req.params[0];
  	if (isNaN(Number(param))) {
  		var date = new Date(param);
  		if (date.toDateString() === 'Invalid Date') {
  			res.send({unix:null,natural:null});
  		} else {
  			res.send({unix:date.getTime(),natural:date.toLocaleDateString()});
  		}
  	} else {
  		var date = new Date(Number(param)).toLocaleDateString();
  		res.send({unix:param,natural:date});
  	}
  });

};
