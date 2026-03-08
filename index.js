const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Memory storage is best for Codespaces

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// The route that freeCodeCamp tests
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log('Request received!'); // Debugging line
  
  // Guard clause to prevent crash if file is missing
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Exact response format required by FCC
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
