import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; 
import contractABI from '../Web3/FreelanceMarketplace.json'; // Replace with your actual ABI
import JobCard from '../components/JobCard';

const JobList = ({limit}) => {
    const [jobs, setJobs] = useState([]);
    const contractAddress = '0x0152D0a3Ef1efbD921E86ED14122055FA0843C5E'; // Replace with your actual contract address

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Connect to Ethereum provider
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send('eth_requestAccounts', []);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, contractABI, signer);

                    // Fetch jobs from the contract
                    const jobData = await contract.getJobs();
                    const formattedJobs = jobData.map((job) => ({
                        jobId: job.jobId.toNumber(),
                        jobPoster: job.jobPoster,
                        title: job.title,
                        shortDescription: job.shortDescription,
                        detailedDescription: job.detailedDescription,
                        budget: ethers.utils.formatEther(job.budget),
                        deadline: job.deadline.toNumber(),
                        image: job.image,
                        workUrl: job.workUrl,
                        isCompleted: job.isCompleted,
                        isApproved: job.isApproved,
                    }));
                    setJobs(formattedJobs);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='pt-10 max-w-[1250px] m-auto flex items-center justify-center'>
            {/* <h1>Available Jobs</h1> */}
            <div className='flex flex-wrap gap-3'>
            {jobs.slice(0, limit).map((job) => (
                <JobCard key={job.jobId} job={job} />
            ))}
            </div>
            
        </div>
    );
};

export default JobList; 