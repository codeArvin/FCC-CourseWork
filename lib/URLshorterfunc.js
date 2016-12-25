var mongoUrl = 'mongodb://main:147258369@ds139288.mlab.com:39288/imagesearch';
var mongo = require('mongodb');

var getRandomStr = function() {
  var n = Math.floor(Math.random() * 5 + 1);

  var randomChar = function() {
    var up = Math.floor(Math.random() * 26 + 65),
        low = Math.floor(Math.random() * 26 + 97),
        flag = Math.floor(Math.random() * 2);
    if (flag) {
      var Char = String.fromCharCode(up);
      return Char;
    } else {
      var Char = String.fromCharCode(low);
      return Char;
    }
  };

  var str = '';
  for (var i = 0; i < n; i++) {
    str += randomChar();
  }

  return str;
};

var isFormat = function (url) {
  var regex = /http:\/\/www\..+\.com/i;
  return regex.test(url);
};

var findUrl = function(id, res) {

  mongo.connect(mongoUrl, function(err, db) {
    if (err) {
      console.log(err);
    }
    db.collection('URLshorter')
      .find({$or: [
        {str: id},
        {url: id}
      ]})
      .toArray(function(err, docs) {
        if (docs.length === 0) {
          res.send('ERROR: this shortURL is not exist');
        } else {
          res.redirect(docs[0].url);
        }
      });
    db.close();
  });
};

var save = function(obj) {
  mongo.connect(mongoUrl, function(err, db) {
    db.collection('URLshorter')
      .insert(obj, function(err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  });
};

var Urlshorter = function(url, host, res) {
  var urlObj = {};
  mongo.connect(mongoUrl, function(err, db) {
      db.collection('URLshorter')
        .find({url: url})
        .toArray(function(err, docs) {
          if (docs.length === 0) {
            var obj = {
              str: getRandomStr(),
              url: url
            };
            var urlObj = {
              originURL: url,
              shortURL: 'https://' + host + '/api/URLshorter/' + obj.str
            };
            save(obj, db);
            res.send(urlObj);
          } else {
            var urlObj = {
              originURL: docs[0].url,
              shortURL: 'https://' + host + '/api/URLshorter/' + docs[0].str
            };
            res.send(urlObj);
          }
        });
        db.close();
  });

};

module.exports = {
  isFormat: isFormat,
  findUrl: findUrl,
  Urlshorter: Urlshorter
};
