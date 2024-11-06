// JobCard_FC.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard_FC = ({ job }) => {
    return (
        <div className="border w-[300px] p-4 rounded-lg shadow-sm">
        <div className='flex h-[100%] flex-col gap-2'>
            <div className='h-[80%]'>
                <img src={job.image} alt={job.title} className="w-full h-32 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-700">{job.shortDescription}</p>
                <p className="text-gray-700 mt-2">Budget: {job.budget} ETH</p>
            </div>
            <div className='h-[10%]'>
                <Link
                    to={`/yourjobs/job-review/${job.jobId}`}
                    className="mt-4 inline-block bg-blue-500 w-[100%] text-center text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Review Applications
                </Link>
            </div>
            </div>
        </div>
    );
};

export default JobCard_FC;
