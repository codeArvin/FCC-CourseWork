var mongo = require('mongodb');
var mongoUrl = 'mongodb://main:147258369@ds139288.mlab.com:39288/imagesearch';

var updateList = function(keywords, time) {
  mongo.connect(mongoUrl, function(err, db) {
    if (err) {
      console.log(err);
    }
    var collection = db.collection('list');
    var insertion = {
      keywords: keywords,
      time: time
    };
    collection.insert(insertion);
    db.close();
  });
};

var showList = function(res) {
  mongo.connect(mongoUrl, function(err, db) {
    if (err) {
      console.log(err);
    }
    db.collection('list')
      .find({}, {
        _id: 0,
        keywords: 1,
        time: 1
      })
      .sort({time: -1})
      .limit(5)
      .toArray(function(err, docs) {
         res.send(JSON.stringify(docs));
         db.close();
      });
  });
};

module.exports = {
  updateList: updateList,
  showList: showList
};
