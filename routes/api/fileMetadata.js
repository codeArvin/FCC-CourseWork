var upload = require('../../lib/fileMetadatafunc.js');

module.exports = function(app) {

  app.get('/api/fileMetadata', function(req, res) {
    res.render('api/fileMetadata', {
      title: 'File Metadata Microservice'
    });
  });

  app.post('/api/fileMetadata/upload', upload.single('file'), function(req, res) {
    var obj = {
      message: 'file is upload successfully!',
      fileSize: req.file.size
    };
    res.send(obj);
  });

};
