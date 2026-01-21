const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 1. CONFIG: Use Memory Storage to prevent Vercel "Read-Only" crashes
const upload = multer({ storage: multer.memoryStorage() });

// 2. ROUTE: With error handling
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  // Check if file exists
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Return the result
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
