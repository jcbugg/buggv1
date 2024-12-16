const mongoose = require('mongoose');

// Database URI
const dbURI =
  'mongodb+srv://buffupgg:TwbrG8wwXYlfAmqB@cluster0.qqgyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Drop the collection
    const dbName = 'test'; // Make sure to replace it with your actual database name
    const collectionName = 'comments'; // Replace with your actual collection name

    const db = mongoose.connection.db;

    db.dropCollection(collectionName, function (err, result) {
      if (err) {
        console.log('Error dropping collection:', err);
      } else {
        console.log('Dropped collection:', result);
      }
      // Close the connection after the operation
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
