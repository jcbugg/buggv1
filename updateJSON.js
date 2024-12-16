const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'youtube_top_10_comments_filtered.json');

// Read the existing JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Define the item name (e.g., HyperX Cloud II)
const itemName = 'HyperX Cloud II';

// Add the item field to each object
const updatedData = data.map((entry) => ({
  ...entry,
  item: itemName, // Add the item field
}));

// Write the updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

console.log('JSON file updated successfully!');
