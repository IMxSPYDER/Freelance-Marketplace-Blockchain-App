// AppliedJobs.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../Web3/FreelanceMarketplace.json'; // Adjust path as necessary

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [account, setAccount] = useState("");
    const contractAddress = '0x0152D0a3Ef1efbD921E86ED14122055FA0843C5E';

    // Request access to the user's Ethereum account
    const requestAccount = async () => {
        if (window.ethereum) {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(account);
        } else {
            console.error("Ethereum provider not found. Install MetaMask.");
        }
    };

    // Fetch jobs the user has applied for
    const fetchAppliedJobs = async () => {
        if (typeof window.ethereum !== 'undefined' && account) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            try {
                const applicationsArray = await contract.getAppliedJobs(account);
                const formattedJobs = applicationsArray.map(application => ({
                    jobId: application.jobId.toNumber(),
                    applicant: application.name,
                    previousWorkLink: application.previousWorkLink,
                    projectLink: application.projectLink,
                    isReviewed: application.isReviewed,
                    isAccepted: application.isAccepted
                }));
                setAppliedJobs(formattedJobs);
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        }
    };

    useEffect(() => {
        requestAccount()
            .then(fetchAppliedJobs)
            .catch(error => console.error("Error during account request or job fetching:", error));
    }, [account]);

    return (
        <div className="pt-24 px-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Applied Jobs</h2>
            {appliedJobs.length === 0 ? (
                <p className="text-gray-600">No jobs found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appliedJobs.map(job => (
                        <div key={job.jobId} className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Job ID: {job.jobId}</h3>
                            <p className="text-gray-700 mb-2"><strong>Applicant:</strong> {job.applicant}</p>
                            <p className="text-gray-700 mb-2">
                                <strong>Previous Work Link:</strong> 
                                <a href={job.previousWorkLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{job.previousWorkLink}</a>
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Project Link:</strong> 
                                <a href={job.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{job.projectLink}</a>
                            </p>
                            <p className="text-gray-700 mb-2"><strong>Reviewed:</strong> {job.isReviewed ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700"><strong>Accepted:</strong> {job.isAccepted ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;