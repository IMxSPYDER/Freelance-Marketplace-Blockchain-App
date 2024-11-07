import React from 'react';
import { Link } from 'react-router-dom';

const JobCard_FC = ({ job }) => {
    // Fallback values in case any job data is missing
    const jobImage = job.image || 'https://via.placeholder.com/300x200.png?text=No+Image'; // Default image if none is provided
    const jobBudget = job.budget ? `${job.budget} ETH` : 'Not available'; // Default budget if not provided
    const jobTitle = job.title || 'Untitled Job'; // Fallback title if missing

    return (
        <div className="border w-[300px] p-4 rounded-lg shadow-sm">
            <div className="flex h-[100%] flex-col gap-2">
                <div className="h-[80%]">
                    <img 
                        src={jobImage} 
                        alt={jobTitle} 
                        className="w-full h-32 object-cover mb-4 rounded" 
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{jobTitle}</h3>
                    <p className="text-gray-700">{job.shortDescription}</p>
                    <p className="text-gray-700 mt-2">Budget: {jobBudget}</p>
                </div>
                <div className="h-[10%]">
                    <Link
                        to={`/yourjobs/job-review/${job.jobId}`}
                        className="mt-4 inline-block bg-blue-500 w-[100%] text-center text-white py-2 px-4 rounded hover:bg-blue-600"
                        title="Review applications for this job"
                    >
                        Review Applications
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard_FC;
