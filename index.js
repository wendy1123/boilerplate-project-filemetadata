const express = require('express');
const cors = require('cors');
const multer = require('multer'); // 1. Import Multer
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 2. CONFIG: Use Memory Storage (Critical for Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. ROUTE: Handle the upload
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  // Error handling: If no file is sent
  if(!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Success response
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
