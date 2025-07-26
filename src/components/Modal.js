// src/components/Modal.jsx
import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  // Prevent clicks inside the modal content from closing the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto transform transition-all sm:my-8 sm:align-middle"
        onClick={handleContentClick} // Prevent content clicks from closing
      >
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added max-height and overflow */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;