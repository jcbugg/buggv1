const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const items = [{ item: 'HyperX Cloud II' }, { item: 'HyperX Cloud III' }];

app.get('/items', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (query) {
    const filteredItems = items.filter((i) =>
      i.item.toLowerCase().includes(query)
    );
    res.json(filteredItems);
  } else {
    res.json([]);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
