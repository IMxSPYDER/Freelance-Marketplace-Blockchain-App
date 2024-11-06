import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

import Home from './pages/Home';
import PostJob from './pages/PostJob';
import FindJob from './pages/FindJob';
import Signup from './pages/Signup';
import Login from './pages/Login';
import JobReview from './pages/JobReview';
// import Pricing from './pages/Pricing';

import Navbar from './components/Navbar';
import Profile from './pages/Profile';

import contractABI from './Web3/FreelanceMarketplace.json'
import JobDetail from './pages/JobDetail';
import ClientJobs from './pages/ClientJobs';
import AppliedJobs from './pages/AppliedJobs';


const App = () => {
  const [account, setAccount] = useState(null);

  const contractAddress = '0x0152D0a3Ef1efbD921E86ED14122055FA0843C5E'; // Replace with your contract address
  

  // Function to connect wallet and prompt account selection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account permissions to force MetaMask to show account selection
        const accounts = await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        }).then(() =>
          window.ethereum.request({ method: 'eth_accounts' })
        );
        setAccount(accounts[0]); // Set to the first selected account
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert('MetaMask not detected. Please install it.');
    }
  };

  // Check if a wallet is already connected on load
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);


  
  return (
    <Router>
        <Navbar account={account} connectWallet={connectWallet} />
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={<Signup  />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/yourjobs" element={<ClientJobs/>} />
          <Route path="/applied_jobs" element={<AppliedJobs/>} />

          {/* <Route path="/pricing" element={<Pricing/>} /> */}
          <Route path="/find-job" element={<FindJob/>} />
          <Route path="/yourjobs/job-review/:jobId" element={<JobReview account={account} />} />
          <Route path="/Profile" element={<Profile account={account} connectWallet={connectWallet} />} />
          <Route path="/job/:jobId" element={<JobDetail />} />

        </Routes>
      
    </Router>
  );
};

export default App;

