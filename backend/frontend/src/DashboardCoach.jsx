import React from 'react';

const DashboardCoach = ({ coach, users }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Coach {coach.name}!</h1>
      <h2 className="text-lg font-semibold mb-2">Your Trainees</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - Goal: {user.goal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardCoach;
