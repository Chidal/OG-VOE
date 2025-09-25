import WalletConnect from '@/components/WalletConnect';
import Link from 'next/link';

export default function Intro() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header with WalletConnect */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">0G-VOE</h1>
        <WalletConnect />
      </header>

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4">Vision of Onchain Events</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A decentralized, AI-powered blockchain analytics dashboard for real-time insights on the 0G network.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Explore Dashboard
          </Link>
          <Link
            href="/nerds"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Developer Dashboard
          </Link>
        </div>
      </section>

      {/* What It Does */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">What It Does</h3>
        <p className="text-lg text-gray-300 max-w-3xl">
          0G-VOE is a decentralized, AI-powered blockchain analytics dashboard that provides real-time insights into transaction histories, block details, and wallet activities on the 0G network. Built on 0G’s modular Layer 1 blockchain, it leverages 0G Chain for smart contract execution, 0G Compute for AI-driven summarization and anomaly detection, 0G Storage for secure data persistence, and 0G Data Availability (DA) for scalable data access. The app features a sleek, degen-style UI with interactive panels (Transaction Tracker, Block Explorer, and AI Insights) that display live onchain data and AI-generated insights, such as transaction summaries (e.g., “10 large USDT transfers in the last hour”) and anomaly alerts (e.g., “Unusual whale activity detected”). By combining real-time blockchain analytics with gamified elements like prediction challenges, 0G-VOE makes onchain data accessible, engaging, and actionable for both users and developers, aligning with 0G’s mission to democratize AI as a public good.
        </p>
      </section>

      {/* The Problem It Solves */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">The Problem It Solves</h3>
        <p className="text-lg text-gray-300 max-w-3xl">
          Blockchain data is often opaque, scattered, and difficult to interpret without specialized tools, creating barriers for users and developers seeking real-time insights into onchain activities.
        </p>
      </section>

      {/* Challenges */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">Challenges We Faced</h3>
        <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 max-w-3xl">
          <li>
            <strong>Real-Time Data Streaming:</strong> Configuring 0G Chain’s log streaming (e.g., eth_getLogs) and Webhooks for real-time transaction and wallet events was complex due to the need for low-latency updates and robust error handling.
          </li>
          <li>
            <strong>Scalability:</strong> Ensuring efficient data retrieval while maintaining performance for large datasets was technically demanding, requiring optimization of data caching and retrieval pipelines.
          </li>
          <li>
            <strong>UI Responsiveness:</strong> Designing a responsive, degen-style UI with Tailwind CSS that could handle real-time updates and interactive charts (e.g., transaction volume trends) without compromising performance was tricky, especially for mobile users.
          </li>
          <li>
            <strong>Type Safety:</strong> Ensuring type-safe data handling with TypeScript across blockchain APIs, WebSocket streams, and AI outputs required meticulous schema definitions and validation to prevent runtime errors.
          </li>
        </ul>
      </section>

      {/* Technologies Used */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">Technologies We Used</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div>
            <h4 className="text-xl font-semibold mb-2">Frontend</h4>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li><strong>Next.js (App Router):</strong> For server-side rendering and scalable component-driven development.</li>
              <li><strong>Tailwind CSS:</strong> For responsive, degen-style UI with interactive panels and charts.</li>
              <li><strong>TypeScript:</strong> For type-safe data handling and robust frontend-backend integration.</li>
              <li><strong>Chart.js:</strong> For rendering interactive charts (e.g., transaction volume trends).</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Blockchain Interaction</h4>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li><strong>0G Chain:</strong> EVM-compatible blockchain for smart contract execution and event logging.</li>
              <li><strong>0G Compute:</strong> For running AI models for summarization, anomaly detection, and predictions.</li>
              <li><strong>0G Storage:</strong> For secure, decentralized storage of historical data and AI model weights.</li>
              <li><strong>0G Data Availability (DA):</strong> For scalable, high-throughput data access.</li>
              <li><strong>Viem/Wagmi:</strong> For querying 0G Chain and interacting with smart contracts.</li>
              <li><strong>RainbowKit:</strong> For wallet connections (e.g., Coinbase Wallet, MetaMask).</li>
              <li><strong>Ethers.js:</strong> For parsing and decoding blockchain logs (e.g., ERC-20 events).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Built It */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">How We Built It</h3>
        <p className="text-lg text-gray-300 max-w-3xl">
          We started with a Next.js project, styling it with Tailwind CSS and securing it with TypeScript. A voting smart contract was crafted using Hardhat and deployed on the 0G Chain. We integrated 0G Storage for metadata, 0G Compute for AI sentiment analysis and fraud detection, and 0G Data Availability for real-time vote streaming. The frontend was built with modular components, connected via Viem/Wagmi, and enhanced with Chart.js for analytics dashboards, culminating in a fully functional demo.
        </p>
      </section>

      {/* What We Learned */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">What We Learned</h3>
        <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 max-w-3xl">
          <li>
            <strong>0G’s Modular Power:</strong> The flexibility of 0G’s services (Chain, Compute, Storage, DA) enabled us to build a cohesive, scalable dApp that seamlessly integrates blockchain data with AI insights.
          </li>
          <li>
            <strong>Real-Time Challenges:</strong> Streaming and processing live blockchain events required careful optimization of WebSocket connections and data pipelines to ensure low latency and reliability.
          </li>
          <li>
            <strong>AI on Blockchain:</strong> Running AI models on 0G Compute taught us how to balance computational efficiency with meaningful outputs, especially for real-time summarization and anomaly detection.
          </li>
          <li>
            <strong>Type Safety Benefits:</strong> Using TypeScript for blockchain and AI data handling significantly reduced runtime errors and improved developer confidence in complex data flows.
          </li>
          <li>
            <strong>User-Centric Design:</strong> Crafting a degen-style, responsive UI with Tailwind CSS and Chart.js showed us the importance of balancing aesthetics with performance for engaging user experiences.
          </li>
          <li>
            <strong>Community Support:</strong> The 0G team’s documentation and guidance were instrumental in navigating the nuances of their modular infrastructure, reinforcing the value of ecosystem collaboration.
          </li>
        </ul>
      </section>

      {/* What's Next */}
      <section className="mb-16">
        <h3 className="text-3xl font-bold mb-4">What's Next for 0G-VOE</h3>
        <div className="text-lg text-gray-300 max-w-3xl">
          <h4 className="text-xl font-semibold mb-2">Wave 4: Advanced AI and Unified Backend</h4>
          <p>
            Enhance AI capabilities on 0G Compute for predictive analytics (e.g., “Next block’s gas fees”) and gamified features like prediction challenges (e.g., “Guess the next whale transaction amount”). Build a unified backend pipeline combining 0G Webhooks, eth_getLogs, and eth_call for flexible contract interactions. Store AI model weights and large datasets in 0G Storage for efficient retrieval.
          </p>
          <h4 className="text-xl font-semibold mt-4 mb-2">Wave 5: Polished Product and Ecosystem Integration</h4>
          <p>
            Polish the UI with interactive charts, leaderboards, and animations using Framer Motion for a premium user experience. Develop SDKs and CLI tools for developers to query 0G-VOE’s data pipeline, fostering ecosystem adoption. Add cross-chain analytics support for other EVM-compatible chains via 0G Chain. Deploy on a decentralized CDN (e.g., Fleek) for trustless hosting.
          </p>
          <h4 className="text-xl font-semibold mt-4 mb-2">Long-Term Vision</h4>
          <p>
            Expand AI capabilities to include narrative context (e.g., “Spike in wallet activity due to DeFi launch”) and personalized user alerts. Integrate Intelligent NFTs (INFTs) to tokenize AI models or analytics dashboards as tradeable assets. Position 0G-VOE as a go-to analytics platform for the 0G ecosystem, driving adoption and innovation in decentralized AI.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400">
        <p>Built by <a href="https://github.com/Chidal" className="underline hover:text-blue-600">Chidal</a> for the 0G WaveHack Challenge</p>
        <p>&copy; 2025 0G-VOE. Licensed under MIT.</p>
      </footer>
    </div>
  );
}