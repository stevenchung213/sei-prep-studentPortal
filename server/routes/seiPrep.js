const express = require('express'),
  router = express.Router(),
  Students = require('../../database');

router.use((req,res,next) => {
  console.log(`incoming ${req.method} request to /api/seiPrep`);
  next();
});

router.get('/student/:name', (req, res) => {
  console.log(`get request from ${req.originalUrl}\n`, req.params);
});

router.post('/', (req,res) => {
  console.log(`post request from ${req.originalUrl}\n`, req.body);

});

module.exports = router;
