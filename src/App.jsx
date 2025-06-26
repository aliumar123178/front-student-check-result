import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [regNumber, setRegNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchResult = async () => {
    if (!regNumber || !firstName) {
      setError('Please enter both registration number and first name.');
      setResult(null);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/results`, {
        params: { student_id: regNumber, first_name: firstName },
      });
      setResult(res.data);
      setError('');
    } catch (err) {
      setResult(null);
      if (err.response?.status === 404) {
        setError('No result found for this student.');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  const clearForm = () => {
    setRegNumber('');
    setFirstName('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <div>
            <h1 className="text-xl font-bold">Addis Ababa Education Bureau</h1>
            <p className="text-sm">QMT Exam Services</p>
          </div>
        </div>
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Login In</button>
      </header>

      <nav className="bg-blue-900 text-white px-10 py-2 text-sm flex gap-6">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Result</a>
        <a href="#" className="hover:underline">Complaint</a>
        <a href="#" className="hover:underline">Announcement</a>
      </nav>

      <main className="p-8 flex justify-center">
        <div className="bg-white rounded shadow-md p-6 border max-w-sm w-full">
          <h2 className="bg-blue-700 text-white text-lg px-4 py-2 rounded-t">Check Result</h2>
          <div className="mt-4">
            <label className="block text-gray-700 mb-1">Registration Number</label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Registration Number"
              className="w-full border rounded p-2 mb-4"
            />

            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border rounded p-2 mb-4"
            />

            <div className="flex gap-4">
              <button
                onClick={fetchResult}
                className="flex items-center bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded hover:bg-blue-100"
              >
                ✅ Check your result
              </button>
              <button
                onClick={clearForm}
                className="flex items-center bg-white text-red-600 border border-red-500 px-4 py-2 rounded hover:bg-red-100"
              >
                🗑️ Clear
              </button>
            </div>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {result && (
              <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
                <p><strong>Name:</strong> {result.name}</p>
                <p><strong>Student ID:</strong> {result.student_id}</p>
                <p><strong>Grade:</strong> {result.grade}</p>
                <p><strong>Status:</strong> {result.status}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
