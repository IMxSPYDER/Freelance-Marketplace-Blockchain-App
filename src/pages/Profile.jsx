// Profile.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import blockies from 'ethereum-blockies-base64';

const Profile = ({ account, connectWallet }) => {
  const [balance, setBalance] = useState(null);
  const [role, setRole] = useState('Freelancer'); // Default role
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(true); // Allow edit only once

  // Format account address to show only first 3 and last 4 characters
  const formatAccount = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  // Generate Blockie avatar based on Ethereum address
  const accountImage = account ? blockies(account) : null;

  // Fetch balance from the connected wallet
  useEffect(() => {
    const fetchBalance = async () => {
      if (account && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      }
    };

    fetchBalance();
  }, [account]);

  const handleEdit = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setCanEdit(false); // Disable further edits
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-96 m-auto">
      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
        <img src={accountImage} alt="Account Avatar" className="w-full h-full" />
      </div>

      <h2 className="text-xl font-bold mb-1">Welcome, {name || 'User'}</h2>
      <p className="text-gray-600 mb-4">Role: {role}</p>

      <div className="w-full text-center mb-4">
        <label className="block text-gray-700">Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md text-center"
          />
        ) : (
          <p className="font-mono text-lg">{name || 'No Name Set'}</p>
        )}
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">Wallet Address:</p>
        <p className="font-mono text-sm bg-gray-100 p-2 rounded-md">{formatAccount(account)}</p>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">Wallet Balance:</p>
        <p className="font-semibold text-lg text-blue-500">{balance ? `${balance} ETH` : 'Loading...'}</p>
      </div>

      <div className="w-full mb-4">
        <label className="block text-gray-700">Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (comma separated)"
          className="w-full px-3 py-2 border rounded-md text-center"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-gray-700">Past Projects:</label>
        <textarea
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          placeholder="Describe your past projects"
          className="w-full px-3 py-2 border rounded-md text-center"
          rows="3"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-gray-700">Feedback Ratings:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter feedback ratings"
          className="w-full px-3 py-2 border rounded-md text-center"
          rows="3"
        />
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setRole('Freelancer')}
          className={`px-4 py-2 rounded-md font-semibold ${role === 'Freelancer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Freelancer
        </button>
        <button
          onClick={() => setRole('Client Poster')}
          className={`px-4 py-2 rounded-md font-semibold ${role === 'Client Poster' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Client Poster
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className={`px-6 py-2 ${canEdit ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded-md font-semibold`}
            disabled={!canEdit}
          >
            Edit
          </button>
        )}
      </div>

      <button
        onClick={connectWallet}
        className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold mt-4"
      >
        {account ? 'Change Account' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default Profile;
