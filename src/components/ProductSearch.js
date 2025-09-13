import React from 'react';

const ProductSearch = ({ query, setQuery, loading, results, showDropdown, setShowDropdown }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-800"
      style={{ minWidth: 180 }}
      aria-label="Search products"
      onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
      onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
    />
    {loading && (
      <div className="absolute left-0 mt-1 bg-white text-gray-500 text-xs px-2 py-1 rounded shadow border border-gray-200 z-10">
        Loading...
      </div>
    )}
    {showDropdown && results.length > 0 && (
      <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-y-auto">
        {results.map(product => (
          <li key={product.id} className="px-3 py-2 hover:bg-blue-50 text-sm text-gray-800 cursor-pointer">
            {product.title}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ProductSearch;
