const express = require('express');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/itemsRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use itemsRoutes for handling API routes
app.use('/api', itemsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
