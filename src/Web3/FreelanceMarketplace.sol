// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceMarketplace {
    
    // Define a structure for Job
    struct Job {
        uint jobId;
        address payable jobPoster;
        string title;
        string shortDescription;
        string detailedDescription;
        uint256 budget;
        uint256 deadline;
        string image;
        string workUrl;
        bool isCompleted;
        bool isApproved;
    }

    // Define a structure for Job Application by Freelancer
    struct Application {
        uint jobId;
        address applicant;
        string name;
        string previousWorkLink;
        string projectLink;
        bool isReviewed;
        bool isAccepted;
    }

    // Store all jobs
    Job[] public jobs;

    // Mapping to track all applications for each jobId
    mapping(uint => Application[]) public jobApplications;

    // Events to emit
    event JobPosted(uint jobId, address indexed jobPoster);
    event JobApplied(uint jobId, address indexed applicant);
    event WorkReviewed(uint jobId, address indexed applicant, bool isAccepted);

    // Modifier to ensure only the job poster can review applications
    modifier onlyJobPoster(uint jobId) {
        require(jobs[jobId].jobPoster == msg.sender, "Not the job poster");
        _;
    }

    // Function to post a job with payment
    function postJob(
        string memory _title,
        string memory _shortDescription,
        string memory _detailedDescription,
        uint256 _deadline,
        uint256 _budget,
        string memory _image,
        string memory _workUrl
    ) external payable {
        // require(_budget > -1, "Budget should be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        jobs.push(Job({
            jobId: jobs.length,
            jobPoster: payable(msg.sender),
            title: _title,
            shortDescription: _shortDescription,
            detailedDescription: _detailedDescription,
            budget: _budget,
            deadline: _deadline,
            image: _image,
            workUrl: _workUrl,
            isCompleted: false,
            isApproved: false
        }));

        emit JobPosted(jobs.length - 1, msg.sender);
    }

    // Function for a freelancer to apply to a job
    function applyForJob(uint _jobId, string memory _name, string memory _previousWorkLink, string memory _projectLink) external {
        require(_jobId < jobs.length, "Invalid job ID");

        Application memory application = Application({
            jobId: _jobId,
            applicant: msg.sender,
            name: _name,
            previousWorkLink: _previousWorkLink,
            projectLink: _projectLink,
            isReviewed: false,
            isAccepted: false
        });

        jobApplications[_jobId].push(application);

        emit JobApplied(_jobId, msg.sender);
    }

    // Function for job poster to review the work and approve/deny it
    function reviewWork(uint _jobId, uint _applicationIndex, bool _isAccepted, string memory _workUrl) external onlyJobPoster(_jobId) {
        require(_jobId < jobs.length, "Invalid job ID");
        require(_applicationIndex < jobApplications[_jobId].length, "Invalid application index");

        Application storage application = jobApplications[_jobId][_applicationIndex];
        require(!application.isReviewed, "Application already reviewed");

        if (_isAccepted) {
            jobs[_jobId].workUrl = _workUrl;
            jobs[_jobId].isCompleted = true;
            jobs[_jobId].isApproved = true;
            application.isAccepted = true;

            // Transfer payment to the freelancer
            (bool sent, ) = payable(application.applicant).call{value: jobs[_jobId].budget}("");
            require(sent, "Failed to send Ether");

            // Delete the application by swapping and popping
            removeApplication(_jobId, _applicationIndex);
        }

        application.isReviewed = true;

        emit WorkReviewed(_jobId, application.applicant, _isAccepted);
    }

    // Helper function to remove an application by index
    function removeApplication(uint _jobId, uint _applicationIndex) internal {
        uint lastIndex = jobApplications[_jobId].length - 1;
        
        // If the application to remove is not the last one, swap it with the last
        if (_applicationIndex != lastIndex) {
            jobApplications[_jobId][_applicationIndex] = jobApplications[_jobId][lastIndex];
        }

        // Remove the last element
        jobApplications[_jobId].pop();
    }

    // Function to get all jobs
    function getJobs() external view returns (Job[] memory) {
        return jobs;
    }

    // Function to get applications for a specific job
    function getApplications(uint _jobId) external view returns (Application[] memory) {
        return jobApplications[_jobId];
    }

    // Function to get all jobs posted by a specific user
    function getJobsByPoster(address _jobPoster) external view returns (Job[] memory) {
        uint jobCount = 0;

        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].jobPoster == _jobPoster) {
                jobCount++;
            }
        }

        Job[] memory userJobs = new Job[](jobCount);
        uint index = 0;

        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].jobPoster == _jobPoster) {
                userJobs[index] = jobs[i];
                index++;
            }
        }

        return userJobs;
    }

    // Function to get all jobs a freelancer has applied to
    function getAppliedJobs(address _applicant) external view returns (Application[] memory) {
        uint count = 0;

        for (uint i = 0; i < jobs.length; i++) {
            for (uint j = 0; j < jobApplications[i].length; j++) {
                if (jobApplications[i][j].applicant == _applicant) {
                    count++;
                }
            }
        }

        Application[] memory appliedJobs = new Application[](count);
        uint index = 0;

        for (uint i = 0; i < jobs.length; i++) {
            for (uint j = 0; j < jobApplications[i].length; j++) {
                if (jobApplications[i][j].applicant == _applicant) {
                    appliedJobs[index] = jobApplications[i][j];
                    index++;
                }
            }
        }

        return appliedJobs;
    }

    // Allow the contract to receive ETH
    receive() external payable {}
} 
