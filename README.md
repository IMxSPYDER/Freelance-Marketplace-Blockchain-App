<body>

  <h1>BlockHire - Decentralized Freelance Marketplace</h1>
  <p>
    BlockHire is a decentralized application (dApp) built on Ethereum to connect freelancers and clients in a transparent and secure way. Leveraging blockchain technology, BlockHire allows freelancers to find job opportunities and clients to hire skilled professionals, all while ensuring trust, accountability, and direct payments through smart contracts.
  </p>

  <h2>Features</h2>
  <ul>
    <li><strong>Job Posting:</strong> Clients can create job postings, specifying details like job description, requirements, and budget.</li>
    <li><strong>Job Applications:</strong> Freelancers can browse available jobs and submit applications, showcasing their skills and experience.</li>
    <li><strong>Work Submission & Review:</strong> Upon job completion, freelancers can submit their work, and clients have the option to review and approve it.</li>
    <li><strong>Direct Payments in ETH:</strong> Clients can release payment in ETH once they approve the submitted work, ensuring a fair and instant transaction.</li>
    <li><strong>Profile Management:</strong> Both freelancers and clients have profiles showcasing their skills, past projects, and feedback ratings to build community trust.</li>
    <li><strong>Metamask Integration:</strong> Secure login and wallet management using Metamask for Ethereum transactions.</li>
  </ul>

  <h2>Smart Contract Functions</h2>
  <ol>
    <li><strong>postJob:</strong> Allows clients to create new job listings with job details.</li>
    <li><strong>applyForJob:</strong> Enables freelancers to apply for available jobs.</li>
    <li><strong>submitWork:</strong> Freelancers can submit their completed work through a link, which the client can review.</li>
    <li><strong>reviewAndApprove:</strong> Clients can review submitted work, approve it, and release payment to the freelancer.</li>
    <li><strong>retrieveJobsByPoster:</strong> Fetches all jobs created by a specific client, allowing them to view current applications and progress.</li>
  </ol>

  <h2>Prerequisites</h2>
  <ul>
    <li><strong>Node.js:</strong> For setting up the development environment.</li>
    <li><strong>ReactJS:</strong> Frontend framework used for the dApp interface.</li>
    <li><strong>Metamask:</strong> For managing Ethereum accounts and transactions.</li>
    <li><strong>Solidity:</strong> Smart contract development language.</li>
    <li><strong>Optimism Sepolia Testnet:</strong> All testing and development transactions are to be conducted on the Optimism Sepolia Testnet only.</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li><strong>Clone the Repository</strong>
      <pre><code>git clone https://github.com/your-username/blockhire.git
cd blockhire</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Start the Development Server</strong>
      <pre><code>npm start</code></pre>
    </li>
    <li><strong>Deploy Smart Contracts</strong>
      <p>Compile and deploy the smart contract on the Optimism Sepolia Testnet using tools like Truffle or Hardhat.</p>
    </li>
    <li><strong>Configure Metamask</strong>
      <p>Connect Metamask to the <strong>Optimism Sepolia Testnet</strong> network.</p>
    </li>
  </ol>

  <h2>Project Structure</h2>
  <ul>
    <li><code>frontend/</code>: Contains the React frontend.</li>
    <li><code>contracts/</code>: Contains Solidity smart contracts for the dApp.</li>
    <li><code>scripts/</code>: Deployment and testing scripts for the blockchain.</li>
    <li><code>public/</code>: Static assets for the frontend.</li>
  </ul>

  <h2>Usage</h2>
  <h3>Client</h3>
  <ul>
    <li>Create a job posting by entering job details and budget.</li>
    <li>Review applications and select a freelancer.</li>
    <li>Upon work submission, review the work and approve it to release payment in ETH.</li>
  </ul>

  <h3>Freelancer</h3>
  <ul>
    <li>Browse available jobs and submit applications for roles of interest.</li>
    <li>Complete assigned jobs and submit work using a link.</li>
    <li>Receive ETH payment directly upon client approval.</li>
  </ul>

  <h2>Contributing</h2>
  <ol>
    <li>Fork the project and create a branch for your feature.</li>
    <li>Make your changes and test thoroughly.</li>
    <li>Submit a pull request for review.</li>
  </ol>


  <h2> <a href="https://freelance-marketplace-blockchain-app.vercel.app/"> Demo </a></h2>
  <img src="https://github.com/user-attachments/assets/9512451e-ec40-4b8c-8050-352643605b67" alt="photo"/>



</body>
</html>
