const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT ||5000;

app.use(cors());

// Import quotes from the JSON file
const quotes = require('./quotes.json');

// Get all quotes
app.get('/api/quotes', (req, res) => {
  res.json(quotes);
});

// Get a random quote
app.get('/api/quotes/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

// Get a quote by ID
app.get('/api/quotes/:id', (req, res) => {
  const quoteId = parseInt(req.params.id);
  const quote = quotes.find(q => q.id === quoteId);
  
  if (quote) {
    res.json(quote);
  } else {
    res.status(404).json({ message: "Quotes not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
