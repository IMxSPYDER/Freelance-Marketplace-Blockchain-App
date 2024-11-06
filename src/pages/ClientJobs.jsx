// ClientJobs.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../Web3/FreelanceMarketplace.json';
import JobCard_FC from '../components/JobCard_FC';

const ClientJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [account, setAccount] = useState("");
    const contractAddress = '0x0152D0a3Ef1efbD921E86ED14122055FA0843C5E';

    const requestAccount = async () => {
        if (window.ethereum) {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(account);
        }
    };

    const fetchJobsByPoster = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            try {
                const jobsArray = await contract.getJobsByPoster(account);
                const formattedJobs = jobsArray.map(job => ({
                    jobId: job.jobId.toNumber(),
                    title: job.title,
                    shortDescription: job.shortDescription,
                    detailedDescription: job.detailedDescription,
                    budget: ethers.utils.formatEther(job.budget),
                    deadline: job.deadline.toNumber(),
                    image: job.image,
                    isCompleted: job.isCompleted,
                    isApproved: job.isApproved
                }));
                setJobs(formattedJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
    };

    useEffect(() => {
        requestAccount().then(fetchJobsByPoster);
    }, [account]);

    return (
        <div className="pt-24 max-w-[1250px] m-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Posted Jobs</h2>
            {jobs.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {jobs.map((job) => (
                        <JobCard_FC key={job.jobId} job={job} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No jobs posted for this account.</p>
            )}
        </div>
    );
};

export default ClientJobs;
