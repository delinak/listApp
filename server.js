const express = require('express');
const router = require('./routes/todoRoutes');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/list', router);

connectDB();

try {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  console.log('Error starting server:', error);
}

module.exports = app;