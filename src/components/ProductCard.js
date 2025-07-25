import React from 'react'
import productsService from '../api/product'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ id, title, description, price, stock, category }) {
    const navigate = useNavigate();
  return (
      <div className="
      border border-gray-200 rounded-lg p-5 m-4
      w-80 shadow-lg bg-white
      flex flex-col justify-between
      hover:shadow-xl transition-shadow duration-300
    ">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {description}
      </p>
      <div className="text-base text-gray-700">
        <p className="font-bold text-blue-600 mb-1">
          Price: ${price}
        </p>
        <p className={`text-sm ${stock > 0 ? 'text-gray-500' : 'text-red-600 font-medium'}`}>
          Stock: {stock}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Category: {category ? category.name : 'N/A'}
        </p>
      </div>

      {/* Conditional Button/Message */}
      {stock > 0 ? (
        <button className="
          mt-5 bg-green-600 hover:bg-green-700 text-white
          font-medium py-2 px-4 rounded-md
          transition-colors duration-200 ease-in-out
        " onClick={()=>navigate(`/products/${id}`)}>
          View Product
        </button>
      ) : (
        <p className="text-red-600 font-bold text-center mt-5">
          Out of Stock
        </p>
      )}
    </div>
  )
}
