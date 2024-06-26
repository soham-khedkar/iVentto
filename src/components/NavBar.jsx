import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from '../services/AuthService';

const Navbar = () => {
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
    <nav className="bg-white bg-opacity-30 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-black text-lg font-bold">Iventto</Link>
          </div>
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link to="/explore" className="text-black">Explore Events</Link>
                <Link to="/add-event" className="text-black">Add Event</Link>
                <button onClick={handleSignOut} className="text-black">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="text-black">Sign Up</Link>
                <Link to="/login" className="text-black">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
