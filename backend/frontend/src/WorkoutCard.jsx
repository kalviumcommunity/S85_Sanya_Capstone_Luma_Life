import React from 'react';

const WorkoutCard = ({ workout }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl m-2">
      <h3 className="text-xl font-bold">{workout.title}</h3>
      <p className="text-gray-700">{workout.description}</p>
      <p className="text-sm text-gray-500 mt-2">Duration: {workout.duration} mins</p>
    </div>
  );
};

export default WorkoutCard;
