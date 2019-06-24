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

router.post('/', (req, res) => {
  console.log(`post request from ${req.originalUrl}\n`, req.body);
  const { username, password, cohort } = req.body;
  // check if student exists in database
  Student.find({ username }).exec()
    .then(resp => {
      // if student does NOT exist
      if (resp.length === 0) {
        // create new student document
        const newStudent = new Student({ username, password, cohort });
        newStudent.save()
          .then(resp => res.status(200).json(resp))
          .catch(err => console.log(`error while saving new student\n${err}`));
      } else {
        // if student EXISTS
        res.status(200).json({
          message: `student account already exists:\n ${username}`
        });
      }
    })
    .catch(err => console.log(`error handling signup POST request at route ${req.originalUrl}\n${err}`));

  // const newStudent = new Student({ username, password, cohort });
  //
  // newStudent.save(err => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // });


});

module.exports = router;
