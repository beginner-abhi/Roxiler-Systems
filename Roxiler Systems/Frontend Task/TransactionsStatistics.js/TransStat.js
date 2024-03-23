import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransactionsStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState('March');

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/api/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div>
      <h2>Transactions Statistics</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {/* Options for selecting month */}
      </select>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
