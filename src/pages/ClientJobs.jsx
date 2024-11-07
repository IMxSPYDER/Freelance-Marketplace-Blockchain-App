import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../Web3/FreelanceMarketplace.json';
import JobCard_FC from '../components/JobCard_FC';

const ClientJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [account, setAccount] = useState("");
    const contractAddress = '0xa32A74F7Cfe43f481dC08FE84575269DaEC89ccd'; // Ensure this is a valid Ethereum address

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
                console.log('Fetched jobs array:', jobsArray);

                const formattedJobs = jobsArray.map((job, index) => {
                    // Check if the required fields are present before mapping
                    // if (!job.jobId || !job.deadline || !job.budget) {
                    //     console.warn(`Job data missing for index ${index}:`, job);
                    //     return null; // Skip jobs with missing essential data
                    // }

                    // Map the job data, handling BigNumbers correctly
                    return {
                        jobId: index,  // Ensure we handle BigNumber correctly
                        title: job.title,
                        shortDescription: job.shortDescription,
                        detailedDescription: job.detailedDescription,
                        budget: job.budget ? ethers.utils.formatEther(job.budget.toString()) : '0', // Handle BigNumber correctly
                        deadline: job.deadline ? job.deadline.toNumber() : 'N/A', // Handle deadline
                        image: job.image,
                        isCompleted: job.isCompleted,
                        isApproved: job.isApproved
                    };
                }).filter(job => job !== null); // Remove null entries (if any)

                console.log('Formatted jobs:', formattedJobs);
                setJobs(formattedJobs); // Update the state with the formatted job data
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
