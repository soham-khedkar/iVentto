import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../appwrite/auth';
import { Button } from '@headlessui/react'

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await auth.logOut();
    setUser(null);
  };

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-md shadow-md fixed w-full top-0 z-10">
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
                <Link to="/signupPage" >
                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
      SignUp
    </Button>
                </Link>
                <Link to="/loginPage">
                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
      Login
    </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
