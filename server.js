const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load the JSON file
const rawData = fs.readFileSync('./reorganized_youtube_comments.json');
const data = JSON.parse(rawData);

// Endpoint to get items based on query
app.get('/items', (req, res) => {
  const searchQuery = req.query.q?.toLowerCase() || '';
  const filteredItems = data
    .filter((item) => item.item.toLowerCase().includes(searchQuery))
    .map((item) => ({ item: item.item })); // Return only the item key
  res.json(filteredItems);
});

// Endpoint to get item details
app.get('/item/:itemName', (req, res) => {
  const { itemName } = req.params;
  const itemDetails = data.find(
    (item) => item.item.toLowerCase() === itemName.toLowerCase()
  );
  if (itemDetails) {
    res.json(itemDetails);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
