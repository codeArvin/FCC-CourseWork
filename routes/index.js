var timestamp = require('./api/timestamp.js');
var reqhdparser = require('./api/reqhdparser.js');
var URLshorter = require('./api/URLshorter.js');
var imagesearch = require('./api/imagesearch.js');
var fileMetadata = require('./api/fileMetadata.js');
var fe = require('./fe/fe.js');

module.exports = function(app) {

  timestamp(app);
  reqhdparser(app);
  URLshorter(app);
  imagesearch(app);
  fileMetadata(app);
  fe(app);

};
