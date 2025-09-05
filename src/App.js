import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const authToken = localStorage.getItem('authToken');
  // In a real application, you would decode the JWT to get user role
  // For now, let's assume you store userRole in localStorage after login
  // Example: localStorage.setItem('userRole', 'seller'); or 'customer'
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  if (!authToken) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    // Optionally redirect to a "Forbidden" page or home
    alert(`Access Denied: You need '${requiredRole}' role to view this page.`);
    return <Navigate to="/" replace />; // Redirect to home page
  }

  return children;
};
const stripePromise = loadStripe('pk_test_51RraVG49xz7o1ilI0FRJnvOt664QUt4bNbcsVSWmzt0FYDDivX51z5VM9Yz1k6s3qVMfqrGMB3vA2639a04NPdfe0091vTZ7tW');
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar /> {/* Include your navigation bar */}
      <main className="flex-grow"> {/* main tag to push footer down if any */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products" element={<ProductListPage />} /> {/* Alias */}
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route
            path="/checkout"
            element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              }
          />
          <Route
            path="/customer/cart"
            element={
              <ProtectedRoute requiredRole="customer"> {/* Example: Requires 'customer' role */}
                <CartPage />
              </ProtectedRoute>
            }
          />
          {/* Add more customer routes here: /customer/orders etc. */}

          {/* Protected Seller Routes */}
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute requiredRole="seller"> {/* Requires 'seller' role */}
                <SellerDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all for undefined routes (optional) */}
          <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
