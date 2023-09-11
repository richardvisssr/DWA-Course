const express = require('express');
const app = express();
const port = 3000;

// Initialize the request counter
let nRequests = 0;

// Middleware to increment the request counter
app.use((req, res, next) => {
  nRequests++; // Increment the counter for each request
  console.log(`Request #${nRequests} received`);
  next(); // Continue processing the request
});

// Your routes and other middleware go here

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
