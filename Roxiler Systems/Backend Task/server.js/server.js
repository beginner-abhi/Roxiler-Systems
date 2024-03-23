const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  combineResponses
} = require('./controllers/transactionController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/api/initialize-database', initializeDatabase);
app.get('/api/transactions', listTransactions);
app.get('/api/statistics', getStatistics);
app.get('/api/bar-chart', getBarChartData);
app.get('/api/pie-chart', getPieChartData);
app.get('/api/all-data', combineResponses);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
