import logo from '../assets/main_logo.png'
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Navbar = ({ account, connectWallet }) => {
  
  const formatAccount = (address) => {
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
  };

  

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white shadow-lg pb-5 z-50">
      {/* Logo Section */}
      <div className="flex justify-between space-x-2 ">
        <Link to='/'  className="flex gap-2 items-center justify-between border border-gray-200 rounded-lg  px-3 py-1  bg-white/80 cursor-pointer">
            <div className='flex flex-col items-center justify-center'>
                <img src={logo} alt="Logo" className="w-10 h-10" />
                {/* <span className="font-semibold">Block<span className='text-blue-500'>Hir</span>e</span> */}
            </div>
            
            <span className="font-bold">Block<span className='text-blue-500'>Hir</span>e</span>
        </Link>
        <div className="flex space-x-4 border border-gray-200 rounded-lg  px-3 py-1  bg-white/80">
          <Link to="/yourjobs" className="text-gray-700 p-2 px-3 hover:bg-gray-100 font-medium rounded-md">My Jobs</Link>
          <Link to="/find-job" className="text-gray-700 p-2 px-3 hover:bg-gray-100 font-medium rounded-md">Explore Jobs</Link>
          <Link to="/applied_jobs" className="text-gray-700 p-2 px-3 hover:bg-gray-100 font-medium rounded-md">My Applications</Link>
          <Link to="/pricing" className="text-gray-700 p-2 px-3 hover:bg-gray-100 font-medium rounded-md">Pricing</Link>
          <Link to="" className="text-gray-700 p-2 px-3 hover:bg-gray-100 font-medium rounded-md">Settings</Link>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex items-center space-x-6">
       
        
        {/* Right Side Buttons */}
        <div className="flex items-center space-x-3 gap-2">
            <div className='  border border-gray-200 rounded-lg  px-1 py-2.5 bg-white/80'>
                <Link to="" className="text-gray-700  hover:bg-gray-100 font-medium px-3 py-2  rounded-md">
                    Contact Sales
                </Link>
            </div>

            
          
          {/* <Link to="/signup" className="text-gray-700 hover:text-gray-900 font-medium">Log in</Link> */}
          
          <Link to="/Profile" onClick={connectWallet} className="px-4 py-2.5 text-white font-semibold bg-blue-500 rounded-md">
              {account ? formatAccount(account) : "Connect to Wallet"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

