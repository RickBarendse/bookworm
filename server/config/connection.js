const mongoose = require('mongoose');

//update local connection string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bookworm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
