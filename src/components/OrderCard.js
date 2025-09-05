import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center">
      <div>
        <h4 className="font-semibold">Order #{order.id}</h4>
        <p className="text-sm text-gray-600">
          Placed on {new Date(order.created_at).toLocaleDateString()}
        </p>
        <span
          className={`mt-1 inline-block px-2 py-1 rounded text-sm ${
            order.status === "placed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <button
        onClick={() => navigate(`/orders/${order.id}`)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  );
}
