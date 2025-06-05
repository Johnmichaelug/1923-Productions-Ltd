import React, { useState } from 'react';

export default function Booking() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Our Services</h2>
      {submitted ? (
        <p className="text-green-600">Your request has been submitted!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Your Name" required onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full border p-2 rounded" />
          <select name="service" required onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Service</option>
            <option value="Event Production">Event Production</option>
            <option value="Livestreaming">Livestreaming</option>
            <option value="Audio/Video Production">Audio/Video Production</option>
            <option value="Permanent Installation">Permanent Installation</option>
            <option value="Training & Mentorship">Training & Mentorship</option>
          </select>
          <textarea name="message" placeholder="Message" rows="4" onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
    </div>
  );
}
