import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/auth";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tempEmail } = location.state || {}; // comes from RegisterPage

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(tempEmail);
    try {
      const res = await authService.verifyEmail({
            email: tempEmail,
            otp: otp
        });

      console.log("Verification success:", res);
      setSuccess("Email verified! Redirecting to dashboard...");

        setTimeout(() => navigate("/products"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-gray-700">
            Enter the OTP sent to <strong>{tempEmail}</strong>
          </p>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border rounded w-full py-3 px-4 mb-4 focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
