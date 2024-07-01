import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../appwrite/auth'; // Assuming your auth service file is named 'auth.js'
import Navbar from '../components/NavBar';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.logOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center min-h-screen ">
      <Navbar /> {/* Render Navbar directly here */}
      <div className="w-full max-w-screen-lg px-4">
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
