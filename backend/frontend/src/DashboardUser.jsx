import React from 'react';

const DashboardUser = ({ user, coach }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p>Coach: {coach.name}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Your Workouts</h2>
        {/* Render workouts here */}
      </div>
    </div>
  );
};

export default DashboardUser;
