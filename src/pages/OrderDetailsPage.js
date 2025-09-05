import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ordersService from "../api/order";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("Fetching order with id:", id);
        const data = await ordersService.getOrder(id);
        console.log("order "+data);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await ordersService.cancelOrder(id);
      alert("Order cancelled successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to cancel order", err);
      alert("Failed to cancel order.");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading order details...</p>;
  if (!order) return <p className="text-center mt-8">Order not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>

      <p>Status: <strong>{order.status}</strong></p>
      <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
      <p className="font-semibold mt-2">Total: ${parseFloat(order.total_price).toFixed(2)}</p>

      <h3 className="mt-6 mb-2 text-lg font-semibold">Items</h3>
      <ul className="space-y-2">
        {order.order_items.map(item => (
          <li
            key={item.id}
            className="flex justify-between p-3 border rounded bg-gray-50"
          >
            <span>{item.product.title} (x{item.quantity})</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      {order.status === "placed" && (
        <button
          onClick={handleCancelOrder}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
