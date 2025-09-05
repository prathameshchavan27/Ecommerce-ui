import React, { useEffect, useState } from "react";
import ProfileService from "../api/profile";
import OrderCard from "../components/OrderCard";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data.user);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* Profile Info */}
      <div className="mb-6">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Roles:</strong> {profile.roles.join(", ")}</p>
        <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>

      {/* Orders List */}
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>
      {profile.orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {profile.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
