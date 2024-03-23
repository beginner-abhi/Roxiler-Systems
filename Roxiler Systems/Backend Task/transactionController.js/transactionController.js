const Transaction = require('../models/Transaction');

// Initialize database from third-party API
const initializeDatabase = async (req, res) => {
  try {
    // For demonstration purposes, assume data is fetched from the third-party API
    const data = [
      { title: 'Product 1', description: 'Description 1', price: 100, category: 'Category 1', dateOfSale: 'January 2023', sold: true },
      { title: 'Product 2', description: 'Description 2', price: 200, category: 'Category 2', dateOfSale: 'February 2023', sold: false },
      // Add more sample data as needed
    ];
    await Transaction.deleteMany({}); // Clear existing data
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List transactions with pagination and search
const listTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search } = req.query;
    const query = { dateOfSale: { $regex: new RegExp(month, 'i') } };
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
        { price: parseFloat(search) || 0 }
      ];
    }
    const transactions = await Transaction.find(query)
      .limit(parseInt(perPage))
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .exec();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get statistics for the selected month
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, 'i') } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalSoldItems = await Transaction.countDocuments({ dateOfSale: { $regex: new RegExp(month, 'i') } });
    const totalNotSoldItems = await Transaction.countDocuments({ dateOfSale: { $regex: new RegExp(month, 'i') }, sold: false });
    res.status(200).json({ totalSaleAmount: totalSaleAmount[0]?.total || 0, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get bar chart data for the selected month
const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const barChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, 'i') } } },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ['$price', 100] }, then: '0 - 100' },
                { case: { $lte: ['$price', 200] }, then: '101 - 200' },
                { case: { $lte: ['$price', 300] }, then: '201 - 300' },
                { case: { $lte: ['$price', 400] }, then: '301 - 400' },
                { case: { $lte: ['$price', 500] }, then: '401 - 500' },
                { case: { $lte: ['$price', 600] }, then: '501 - 600' },
                { case: { $lte: ['$price', 700] }, then: '601 - 700' },
                { case: { $lte: ['$price', 800] }, then: '701 - 800' },
                { case: { $lte: ['$price', 900] }, then: '801 - 900' },
                { case: { $gte: ['$price', 901] }, then: '901-above' }
              ],
              default: 'Unknown'
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get pie chart data for the selected month
const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, 'i') } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.status(200).json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Combine responses from all APIs
const combineResponses = async (req, res) => {
  try {
    // Fetch data from all APIs
    // Combine responses
    const data = {
      // combined data
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
