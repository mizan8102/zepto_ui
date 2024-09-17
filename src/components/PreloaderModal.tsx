import React from 'react';
import ReactDOM from 'react-dom';

interface PreloaderModalProps {
  show: boolean;
}

const PreloaderModal: React.FC<PreloaderModalProps> = ({ show }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="p-4 bg-white rounded shadow-lg">
        <div className="flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
          </svg>
        </div>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    </div>,
    document.body
  );
};

export default PreloaderModal;
