var express = require('express');
var app = express();
var routes = require('./routes');

// port
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

// layout engine
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
	layoutDir: './views',
	defaultLayout: 'main',
	extname: 'hbs'
}));
app.set('view engine', 'hbs');

// route
app.get('/', function(req, res) {
	res.render('home', {
		title: 'FCC CourseWork'
	});
});

routes(app);

app.listen(app.get('port'), function(err) {
	if (err) {
		console.log(err);
	}
	console.log('The FCC Work app is running on port: ' + app.get('port'));
});
