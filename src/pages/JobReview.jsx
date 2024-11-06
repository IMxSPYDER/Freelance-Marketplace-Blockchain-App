// JobReview.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import contractABI from '../Web3/FreelanceMarketplace.json';

const JobReview = ({account}) => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const contractAddress = '0x0152D0a3Ef1efbD921E86ED14122055FA0843C5E';
    const [balance, setBalance] = useState(null);


    const fetchApplications = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            try {
                const applicationsArray = await contract.getApplications(jobId);
                const formattedApplications = applicationsArray.map(app => ({
                    applicant: app.applicant,
                    name: app.name,
                    previousWorkLink: app.previousWorkLink,
                    projectLink: app.projectLink,
                    isReviewed: app.isReviewed,
                    isAccepted: app.isAccepted,
                }));
                setApplications(formattedApplications);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        }
    };

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

    const handleApproveApplication = async (applicationIndex, workUrl) => {
      if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          try {
              const account = await signer.getAddress();
              console.log("Connected account:", account);
  
              // Check contract balance
            //   const balance = await provider.getBalance(contractAddress);
              console.log("Contract balance:", balance);
  
              // Attempt to approve application
              const tx = await contract.reviewWork(
                jobId, 
                applicationIndex, 
                true, 
                workUrl,
                { gasLimit: 8000000 }
            );
              await tx.wait();
              console.log("Application approved, payment sent!");
              alert("Application approved, payment sent!");
              fetchApplications();  // Refresh applications list after approval
          } catch (error) {
              console.error("Error approving application:", error);
              alert("Failed To approve")
              if (error.data && error.data.message) {
                  console.error("Detailed error message:", error.data.message);
              }
          }
      }
  };
  

    const handleDenyApplication = async (applicationIndex) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                const tx = await contract.reviewWork(jobId, applicationIndex, false, "");
                await tx.wait();
                console.log("Application denied and removed.");
                fetchApplications();  // Refresh applications list after denial
            } catch (error) {
                console.error("Error denying application:", error);
            }
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    return (
        <div className="pt-24 px-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Applications for Job ID {jobId}</h2>
            {applications.length > 0 ? (
                applications.map((app, index) => (
                    <div key={index} className="flex flex-col border p-4 rounded-lg shadow-sm mb-4">
                        <h3 className="text-lg font-semibold">{app.name}</h3>
                        <p className="text-gray-700">Applicant: {app.applicant}</p>
                        <a href={app.previousWorkLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Previous Work
                        </a>
                        <a href={app.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Praposal Work
                        </a>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => handleApproveApplication(index, app.projectLink)}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Approve Application
                            </button>
                            <button
                                onClick={() => handleDenyApplication(index)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Deny Application
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No applications for this job.</p>
            )}
        </div>
    );
};

export default JobReview;
