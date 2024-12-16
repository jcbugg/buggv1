const mongoose = require('mongoose');
const fs = require('fs');
const Comment = require('./models/Comment'); // Path to your model file

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://buffupgg:TwbrG8wwXYlfAmqB@cluster0.qqgyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      // Replace with your actual URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Set timeout to 30 seconds
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the script if the connection fails
  });

// Import data
const data = JSON.parse(
  fs.readFileSync('reorganized_youtube_comments', 'utf-8')
);

Comment.insertMany(data)
  .then(() => {
    console.log('Data successfully imported!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error importing data:', err);
    mongoose.connection.close();
  });
