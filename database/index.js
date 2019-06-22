require('dotenv').config();
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const mongoUri = process.env.DATABASE || `mongodb://localhost:27017/seiPrep`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log(`mongoDB connected at ${mongoUri}`);
  })
  .catch(err => console.log(err));

const StudentsSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

StudentsSchema.pre('save', function(next) {
  let user = this;

// only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });


});

StudentsSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('Students', StudentsSchema);
