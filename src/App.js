import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";


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
          <Route path="/customer/cart" element={<CartPage/>} />
          {/* Catch-all for undefined routes (optional) */}
          <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
