import { Link } from "react-router-dom";
import imag from '../assets/bgg1.png';
import PostJob from "./PostJob";
import { ethers } from 'ethers'; 
import { useState } from "react";
import contractABI from '../Web3/FreelanceMarketplace.json';
import JobList from "./JobListing";
import image from '../assets/bgg1.png';
import TimePass from "../components/TimePass";

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="h-screen bg-cover bg-top bg-no-repeat flex items-center justify-center" 
            // style={{ backgroundImage: `url(${image})` }}
            >
                <div className="max-w-[1250px] w-full flex flex-col items-center pt-[200px]">
                    <div className="flex flex-col items-center justify-center mb-[150px] h-64">
                        <div className="relative whitespace-nowrap">
                        
                            <h1 className="font-bold text-blue-950 text-6xl">Crafting Connections for 
                            <span className="relative whitespace-nowrap text-blue-600"><svg aria-hidden="true" viewBox="0 0 418 42" className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
                            <span className="relative">Creative Minds</span>
                            </span>
                            {/* <span className="text-blue-500">Creative Minds</span> */}
                            </h1>
                            
                        </div>
                        <div className="mt-8 max-w-[850px] font-medium text-gray-700 text-2xl text-center">
                            Discover opportunities at <span className="font-bold text-gray-800">Block<span className="text-blue-500">Hir</span>e</span>, where freelancers connect with businesses. Showcase your skills, collaborate on projects, and get paid securely - all on your terms. Join us today!
                        </div>
                        <div className="mt-8 flex items-center gap-8 justify-center">
                            <div className="px-1 py-2.5 text-white bg-blue-500 font-semibold rounded-md">
                                <Link to="" onClick={openModal} className="px-4 py-1.5 hover:bg-blue-600 rounded-md">
                                    Post JOB
                                </Link>
                            </div>
                            <div className="px-1 py-2.5 border border-gray-200 bg-white/80 font-semibold rounded-md">
                                <Link to="/find-job" className="text-gray-700 px-4 py-1.5 hover:bg-gray-100 rounded-md">
                                    Find JOB
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display JobList and PostJob outside the background container */}
            
                <JobList limit={4} />
            
            
            {isModalOpen && <PostJob closeModal={closeModal} />}
            <TimePass/>
        </>
    );
}

export default Home;
