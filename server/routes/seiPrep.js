const express = require('express'),
  router = express.Router(),
  Student = require('../../database');

router.use((req, res, next) => {
  console.log(`incoming ${req.method} request to /api/seiPrep`);
  next();
});

// router.get('/:name', (req, res) => {
//   console.log(`get request from ${req.originalUrl}\n`, req.params);
// });

router.post('/register', (req, res) => {
  console.log(`post request from ${req.originalUrl}\n at /register`, req.body);
  const { username, password, cohort } = req.body;
  // check if student exists in database
  Student.find({ username }).exec()
    .then(resp => {
      // if student does NOT exist
      if (resp.length === 0) {
        // create new student document
        const newStudent = new Student({ username, password, cohort });
        newStudent.save()
          .then(() => res.status(200).json({ success: 'registration' }))
          .catch(err => console.log(`error while saving new student\n${err}`));
      } else {
        // if student EXISTS
        res.status(200).json({
          message: `student username already exists:\n ${username}`
        });
      }
    })
    .catch(err => {
      console.log(`error handling registration POST request from route ${req.originalUrl} at /register\n${err}`);
      res.status(200).json({
        error: 'an error occurred during registration'
      });
    });
});

router.post('/login', (req, res) => {
  console.log(`post request from ${req.originalUrl}\n at /login`, req.body);

});

module.exports = router;
