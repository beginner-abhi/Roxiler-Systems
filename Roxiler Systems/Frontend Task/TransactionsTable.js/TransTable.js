import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [month, setMonth] = useState('March');

  useEffect(() => {
    fetchTransactions();
  }, [month, page, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions?month=${month}&page=${page}&perPage=${perPage}&search=${search}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {/* Options for selecting month */}
      </select>
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search transactions" />
      <table>
        {/* Table headers */}
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              {/* Table rows */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;