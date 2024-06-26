import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from '../services/AuthService';
import Navbar from '../components/NavBar'; 

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> {/* Render Navbar directly here */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Iventto</h1>
        
        {user ? (
          <div className="flex justify-center space-x-4">
            <Link to="/explore" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Explore Events
            </Link>
            <Link to="/add-event" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Add Event
            </Link>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-center">
            Please <Link to="/login" className="text-blue-500">Login</Link> or 
            <Link to="/signup" className="text-blue-500"> Sign Up</Link> to explore events and add events.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
