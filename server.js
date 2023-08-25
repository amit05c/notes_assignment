// const express = require('express');
// const multer = require('multer');
// const app = express();
// const port = 3001;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.array('files'), (req, res) => {
//   const { title, description } = req.body;
//   console.log(req.body)
//   const uploadedFiles = req.files.map((file) => ({
//     filename: file.filename,
//     originalname: file.originalname,
//     mimetype: file.mimetype,
//   }));
//   const uploadData = {
//     title,
//     description,
//     files: uploadedFiles,
//   };
//   db.get('data').push(uploadData).write();
//   res.json({ message: 'Files uploaded successfully' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const multer = require('multer');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

server.use(middlewares);

// For JSON Server's router
const router = jsonServer.router('db.json');
server.use(router);

const port = process.env.PORT || 3001;

app.post('/upload', upload.array('files'), (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.files)
  console.log(req.body)
  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    url: `${file.filename}`,
  }));
  const uploadData = {
    title,
    description,
    files: uploadedFiles,
  };

  // Read the JSON data from 'db.json'
  const dbPath = path.join(__dirname, 'db.json');
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  const jsonData = JSON.parse(dbContent);

  // Update the data with the new uploadData
  jsonData.data.push(uploadData);

  // Write the updated data back to 'db.json'
  fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2), 'utf8');

  // Continue with next middleware to handle JSON Server routes
  // next();
  res.json("data added successfully")
});


app.get('/data', (req, res) => {
    // Read the data from 'db.json'
    const dbPath = path.join(__dirname, 'db.json');
    const dbContent = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(dbContent);
    console.log(jsonData)
    // Send the 'data' property as the response
    res.json(jsonData.data);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
