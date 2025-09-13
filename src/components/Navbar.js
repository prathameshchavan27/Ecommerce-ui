// src/components/Navbar.jsx
import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import  authService  from '../api/auth.js'; // Import auth service

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken'); // Simple check for token presence
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  const handleLogout = async () => {
    await authService.logout();
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          E-Commerce App
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Products
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/customer/cart" className="text-gray-300 hover:text-white">
                Cart
              </Link>
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-white">
                  Admin
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                {user ? user.name : ''}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;