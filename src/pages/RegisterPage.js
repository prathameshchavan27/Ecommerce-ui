// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import authService from '../api/auth'; // Your authentication API service

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   // Single state object for all form fields
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     passwordConfirmation: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Generic change handler for all form inputs
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value, // Use the input's 'id' as the key to update the correct field
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     // Destructure for easier access
//     const { email, password, passwordConfirmation } = formData;

//     if (password !== passwordConfirmation) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Use formData properties directly in the API call
//       const response = await authService.register({
//         user: {
//           email,
//           password,
//           password_confirmation: passwordConfirmation,
//         },
//       });

//       console.log('Registration successful:', response);
//       setSuccess('Registration successful! You can now log in.');

//       // Optionally clear form after successful registration
//       setFormData({
//         email: '',
//         password: '',
//         passwordConfirmation: '',
//       });

//       // Redirect to login page after a short delay to show success message
//       setTimeout(() => {
//         navigate('/');
//       }, 2000); // Redirect after 2 seconds
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
//       setError(errorMessage);
//       console.error('Registration error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Your Account</h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <strong className="font-bold">Error!</strong>
//             <span className="block sm:inline"> {error}</span>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <strong className="font-bold">Success!</strong>
//             <span className="block sm:inline"> {success}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email" // id must match the key in formData
//               className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="you@example.com"
//               value={formData.email} // Access from formData
//               onChange={handleChange} // Use the generic handler
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password" // id must match the key in formData
//               className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Minimum 6 characters"
//               value={formData.password} // Access from formData
//               onChange={handleChange} // Use the generic handler
//               required
//               minLength="6"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="passwordConfirmation" className="block text-gray-700 text-sm font-semibold mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="passwordConfirmation" // id must match the key in formData
//               className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Re-enter your password"
//               value={formData.passwordConfirmation} // Access from formData
//               onChange={handleChange} // Use the generic handler
//               required
//               minLength="6"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full transition-colors duration-200"
//               disabled={loading}
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </div>
//         </form>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Already have an account?{' '}
//           <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../api/auth'; // Your authentication API service

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'customer', // default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { email, password, passwordConfirmation, role } = formData;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          role, // pass role to backend
        },
      });

      console.log('Registration successful:', response);
      setSuccess('Registration successful! You can now log in.');

      setFormData({
        email: '',
        password: '',
        passwordConfirmation: '',
        role: 'customer',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An unexpected error occurred.';
      // setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error!</strong> {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <strong>Success!</strong> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="passwordConfirmation"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              className="border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Register As
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-200"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
