var express = require('express');
var cors = require('cors');
const multer = require('multer');
const req= require('express/lib/request');
const res= require('express/lib/response');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  if(req.file){
    res.json(
      {
        "name": req.file.originalname,
        "type": req.file.mimetype,
        "size": req.file.size,
      });
  }else{
    res.status(400).send("File Not Found");
  }
});



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log('Your app is listening on port ' + port)
});