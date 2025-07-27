// src/pages/Admin/AdminDashboardPage.jsx
import React from 'react';
import CategoryManagement from './CategoryManagement';

const AdminDashboardPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Dashboard</h1>
      {/* You can add navigation/tabs here later for other admin sections */}

      <CategoryManagement />
    </div>
  );
};

export default AdminDashboardPage;