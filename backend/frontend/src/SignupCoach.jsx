import React, { useState } from 'react';

const SignupCoach = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialization: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Coach Signup Data:', formData);
    // Add API call here
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Coach Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" onChange={handleChange} value={formData.name} placeholder="Name" className="p-2 border rounded" required />
        <input name="email" onChange={handleChange} value={formData.email} placeholder="Email" type="email" className="p-2 border rounded" required />
        <input name="password" onChange={handleChange} value={formData.password} placeholder="Password" type="password" className="p-2 border rounded" required />
        <input name="specialization" onChange={handleChange} value={formData.specialization} placeholder="Specialization" className="p-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupCoach;
