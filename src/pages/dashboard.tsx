// Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Dashboard!</h1>
        <p className="text-slate-600">This is the dashboard page after a successful login.</p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
