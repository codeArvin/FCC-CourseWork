var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    var arr = file.originalname.split('.');
    var name = arr[0];
    var ext = arr[1];
    cb(null, name + '.' + ext);
  }
});
var limits = {
  fileSize: 1024*1024*1024
};
//var upload = multer({storage: storage, limits: limits});

// heroku maybe can't let user to write file ,so....
module.exports = multer({limits: limits});
