const mongoose = require('mongoose');

function connectDB() {
  mongoose
    .connect(
      'mongodb+srv://buffupgg:TwbrG8wwXYlfAmqB@cluster0.qqgyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
}

module.exports = connectDB;
