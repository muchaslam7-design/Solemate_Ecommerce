import React from 'react';
import { GiRunningShoe } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const SecondaryNavbar = () => {
  const navigate = useNavigate();

  const linkClasses = "text-gray-300 hover:text-white transition duration-200 text-sm font-semibold cursor-pointer bg-transparent border-none outline-none";

  //  LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.removeItem("curr_session"); // Session clear
    navigate("/signup"); // Redirect to login/signup
  };

  return (
    <>
      <nav className="w-full z-40 relative">
        <div className="bg-teal-700 bg-opacity-10 py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            {/*LOGO */}
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 flex items-center justify-center bg-green-500 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-teal-800 transform -skew-y-3 skew-x-3 w-1/3 opacity-70"></div>
                <GiRunningShoe className="h-7 w-7 text-white relative z-10" />
              </div>
              <div className="flex flex-col justify-center">
                  <h1 className="text-white text-3xl font-black tracking-widest uppercase leading-none">SOLEMATE</h1>
                  <p className="text-green-300 text-xs font-medium tracking-wider mt-1 whitespace-nowrap hidden sm:block border-b border-green-300">Your Perfect Match</p>
              </div>
            </div>
            
            {/* CENTER LINKS */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className={linkClasses}>Home</Link>
              <Link to="/sellerProfile" className={linkClasses}>SellerProfile</Link>
              <Link to="/customer" className={linkClasses}>Customer</Link>
              <Link to="/career" className={linkClasses}>Career</Link>
              <Link to="/employee" className={linkClasses}>Employee</Link>
              <Link to="/performanceoverview" className={linkClasses}>Performance Overview</Link>
            </div>
            
            {/* ACTION BUTTONS */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-transparent border-2 border-green-500 text-green-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
              >
                <FiLogOut /> Logout
              </button>
              
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm">
                Buy Now $19
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SecondaryNavbar;