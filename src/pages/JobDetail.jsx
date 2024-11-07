import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import contractABI from '../Web3/FreelanceMarketplace.json';

Modal.setAppElement('#root'); // Set the app root for accessibility

const JobDetail = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [previousWorkLink, setPreviousWorkLink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const contractAddress = '0xa32A74F7Cfe43f481dC08FE84575269DaEC89ccd'; // Replace with actual contract address

    // Fetch job details from contract
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const contract = new ethers.Contract(contractAddress, contractABI, provider);

                    const jobs = await contract.getJobs();
                    const jobData = jobs[jobId]; // Get the job at the specific jobId index
                    
                    if (jobData) {
                        // Check and convert BigNumber values correctly
                        const jobId = jobData.jobId ? jobData.jobId.toNumber() : null;
                        const deadline = jobData.deadline ? jobData.deadline.toNumber() : null;

                        setJob({
                            jobId: jobId,
                            jobPoster: jobData.jobPoster,
                            title: jobData.title,
                            shortDescription: jobData.shortDescription,
                            detailedDescription: jobData.detailedDescription,
                            budget: ethers.utils.formatEther(jobData.budget), // Convert from BigNumber to readable format
                            deadline: deadline ? new Date(deadline * 1000).toLocaleDateString() : 'No deadline',
                            image: jobData.image,
                            workUrl: jobData.workUrl,
                            isCompleted: jobData.isCompleted,
                            isApproved: jobData.isApproved,
                        });
                    } else {
                        console.error(`Job with ID ${jobId} not found`);
                    }
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    // Handle the "Apply" button to open the modal
    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Submit application to smart contract
    const submitApplication = async () => {
        if (!name || !previousWorkLink || !projectLink) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const tx = await contract.applyForJob(jobId, name, previousWorkLink, projectLink);
                await tx.wait(); // Wait for the transaction to be mined

                alert("Application submitted successfully!");
                closeModal();
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application.");
        }
    };

    

    if (!job) return <p>Loading...</p>;

    return (
        <div className='pt-[100px]'>
            <div className="max-w-3xl mx-auto mt-8 px-4">
                <div onClick={() => navigate('/')} className='cursor-pointer p-2 border border-gray-500 rounded-full w-10 text-center font-semibold text-gray-700 mb-5'>
                    <div className="fa-solid fa-arrow-left" />
                </div>
                <img src={job.image} alt={job.title} className="w-full h-72 object-cover rounded-lg mb-6" />
                <div className='flex gap-2 mb-8'>
                    <div className='w-[60%]'>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                        <p className="text-gray-700 mb-4"><strong>Short Description:</strong> {job.shortDescription}</p>
                        <p className="text-gray-700 mb-4"><strong>Detailed Description:</strong> {job.detailedDescription}</p>
                    </div>
                    <div className='w-[40%] flex flex-col gap-5'>
                        <div className='h-[50%]'>
                            <p className="text-gray-700 mb-4"><strong>Budget:</strong> {job.budget} ETH</p>
                            <p className="text-gray-700 mb-6"><strong>Deadline:</strong> {job.deadline}</p>
                        </div>
                        <div className='flex items-center justify-center gap-3 h-[10%]'>
                            <button
                                onClick={handleApplyClick}
                                className="bg-green-500 text-center w-[50%] text-white p-2 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
                            >
                                Apply for Job
                            </button>
                            <Link
                                to={job.workUrl}
                                target='_blank'
                                className="bg-blue-500 text-white w-[50%] p-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                            >
                                See Project Files
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Job Application Form */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Apply for Job"
                className="bg-white max-w-lg p-8 mx-auto my-16 rounded-lg shadow-lg outline-none"
            >
                <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    placeholder="Link to Previous Work"
                    value={previousWorkLink}
                    onChange={(e) => setPreviousWorkLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    placeholder="Project Link"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={submitApplication}
                    className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                >
                    Submit Application
                </button>
                <button
                    onClick={closeModal}
                    className="ml-4 bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default JobDetail;
