import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; 
import contractABI from '../Web3/FreelanceMarketplace.json'; // Replace with your actual ABI
import JobCard from '../components/JobCard';

const JobList = ({ limit }) => {
    const [jobs, setJobs] = useState([]);
    const contractAddress = '0xa32A74F7Cfe43f481dC08FE84575269DaEC89ccd'; // Replace with your actual contract address

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
                    
                    // Log the fetched job data to inspect its structure
                    console.log('Fetched job data:', jobData);
                    
                    // Check if jobData is an array and if it contains job objects
                    const formattedJobs = jobData.map((job, index) => {
                        console.log(`Job ${index}:`, job); // Log each job data separately for inspection
                        
                        if (Array.isArray(job)) {
                            // The job data is an array, map its values accordingly
                            const [jobPoster, title, shortDescription, detailedDescription, budget, deadline, image, workUrl, isCompleted, isApproved] = job;

                            return {
                                jobId: index, // You can use the index or fetch the job ID if available in the contract
                                jobPoster,
                                title,
                                shortDescription,
                                detailedDescription,
                                budget: ethers.utils.formatEther(budget),
                                deadline: deadline ? deadline.toNumber() : 0, // Default to 0 if invalid
                                image,
                                workUrl,
                                isCompleted,
                                isApproved,
                            };
                        } else {
                            console.warn('Invalid job data at index', index, ':', job);
                            return null;
                        }
                    }).filter(job => job !== null); // Filter out any invalid jobs
                    
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
            <div className='flex flex-wrap gap-3'>
                {jobs.slice(0, limit).map((job) => (
                    <JobCard key={job.jobId} job={job} />
                ))}
            </div>
        </div>
    );
};

export default JobList;
