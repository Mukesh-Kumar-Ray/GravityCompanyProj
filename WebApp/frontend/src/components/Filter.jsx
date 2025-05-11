import React from 'react';

const Filter = ({ filter, setFilter }) => (
  <div className="flex justify-center gap-4 my-4">
  <button
    onClick={() => setFilter('all')}
    disabled={filter === 'all'}
    className={`px-4 py-2 rounded-lg border shadow-sm transition 
      ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
  >
    All
  </button>
  <button
    onClick={() => setFilter('completed')}
    disabled={filter === 'completed'}
    className={`px-4 py-2 rounded-lg border shadow-sm transition 
      ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
  >
    Completed
  </button>
  <button
    onClick={() => setFilter('pending')}
    disabled={filter === 'pending'}
    className={`px-4 py-2 rounded-lg border shadow-sm transition 
      ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
  >
    Pending
  </button>
</div>

);

export default Filter;
