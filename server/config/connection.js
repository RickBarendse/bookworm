const mongoose = require('mongoose');

//update local connection string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookwormdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
