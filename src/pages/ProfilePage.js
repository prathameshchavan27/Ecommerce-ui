import React, { useEffect, useState } from "react";
import ProfileService from "../api/profile";
import OrderCard from "../components/OrderCard";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data.user);
        setUsername(data.user.name); // Pre-fill username field
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateUsername = async () => {
    if (!username.trim()) return alert("Username cannot be empty");

    setSaving(true);
    try {
      const updatedUser = await ProfileService.updateProfile({ name: username });
      setProfile((prev) => ({ ...prev, name: updatedUser.name }));
      alert("Username updated successfully!");
    } catch (err) {
      console.error("Error updating username", err);
      alert("Failed to update username");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* Profile Info */}
      <div className="mb-6 space-y-2">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Roles:</strong> {profile.roles.join(", ")}</p>
        <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>

      {/* Update Username */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Update Username</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 w-64"
            placeholder="Enter new username"
          />
          <button
            onClick={handleUpdateUsername}
            disabled={saving}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
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
