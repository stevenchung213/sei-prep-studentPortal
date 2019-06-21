require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.DATABASE || `mongodb://localhost:27017/seiPrep`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log(`mongoDB connected at ${mongoUri}`);
  })
  .catch(err => console.log(err));

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

const Students = mongoose.model('students', studentsSchema);

module.exports = Students;
