

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransactionsBarChart = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [month, setMonth] = useState('March');

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`/api/bar-chart?month=${month}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  // Render bar chart using barChartData

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {/* Options for selecting month */}
      </select>
      {/* Render bar chart */}
    </div>
  );
};

export default TransactionsBarChart;
