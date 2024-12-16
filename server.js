const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

// Path to the JSON file
const dataFilePath = path.join(
  __dirname,
  'data',
  'youtube_top_10_comments_filtered.json'
);

// Read the JSON file
const getData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

app.get('/items', (req, res) => {
  const query = req.query.q?.toLowerCase();
  const items = getData();

  if (query) {
    // Filter items based on query
    const filteredItems = items.filter((i) =>
      i.item.toLowerCase().includes(query)
    );
    res.json(filteredItems);
  } else {
    res.json([]);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
