// server/index.js
const express = require('express');
const app = express();

const characterRouter = require('./routes/character');

// Use the character router for all /character routes
app.use('/character', characterRouter);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
