module.exports = function(app) {
  app.get('/api/reqhdparser', function(req, res) {
  	var ip = req.headers['x-forwarded-for'] ||
  			 req.connection.remoteAddress ||
  			 req.socket.remoteAddress ||
  			 req.connection.socket.remoteAddress,
  		language = req.headers['accept-language']
  					  .split(',')[0],
  		OSInfo = req.headers['user-agent']
  					.split(' (')[1].split(')')[0];
  	var info = {
  		IP: ip,
  		Language: language,
  		OSInfo: OSInfo
  	};
  	res.send(info);
  });
};
