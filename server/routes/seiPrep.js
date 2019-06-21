const express = require('express'),
  request = require('request'),
  Students = require('../../database'),
  router = express.Router();

router.use((req,res,next) => {
  console.log(`incoming ${req.method} request to /api/seiPrep`);
  next();
});

