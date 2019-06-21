const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const seiPrep = require('./routes/sei-prep');

const app = express();
const port = process.env.PORT || 3000;

/* MIDDLEWARES */
// securing your app by setting various HTTP headers
app.use(helmet());
// to deal with cross-origin resource sharing
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// set static-files distribution folder
app.use(express.static(path.resolve(__dirname + '/../dist')));
// specific route instructions
app.use('./api/seiPrep', seiPrep);

// send our index.html to client upon arrival of our site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});



// have express listen on defined ${port} which is currently set to 3000 on line 7
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('express listening at http://localhost:' + port + '/');
});