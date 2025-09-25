import Link from 'next/link';
import ClientWalletConnect from '@/components/ClientWalletConnect';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ClientWalletConnect />
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Welcome to 0G-VOE: Vision of Onchain Events
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A decentralized, AI-powered blockchain analytics dashboard built on 0G’s modular Layer 1 blockchain, delivering real-time insights into transactions, blocks, and wallet activities.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
            Explore Dashboard
          </Link>
          <Link href="/nerds" className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
            Developer Dashboard
          </Link>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">What 0G-VOE Does</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          0G-VOE is a decentralized, AI-powered blockchain analytics dashboard that provides real-time insights into transaction histories, block details, and wallet activities on the 0G network. Built on 0G’s modular Layer 1 blockchain, it leverages:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4 max-w-3xl mx-auto">
          <li><strong>0G Chain</strong>: For smart contract execution and event logging.</li>
          <li><strong>0G Compute</strong>: For AI-driven summarization and anomaly detection (e.g., “10 large USDT transfers in the last hour”).</li>
          <li><strong>0G Storage</strong>: For secure data persistence of historical data and AI model weights.</li>
          <li><strong>0G Data Availability (DA)</strong>: For scalable, high-throughput data access.</li>
        </ul>
        <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
          With a sleek, degen-style UI featuring interactive panels (Transaction Tracker, Block Explorer, AI Insights), 0G-VOE delivers live onchain data and AI-generated insights, such as anomaly alerts (“Unusual whale activity detected”) and gamified prediction challenges, making blockchain data accessible and engaging for users and developers.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">The Problem It Solves</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Blockchain data is often opaque, scattered, and difficult to interpret without specialized tools, creating barriers for users and developers seeking real-time insights into onchain activities. 0G-VOE addresses this by providing a unified, user-friendly platform that combines real-time analytics with AI-driven insights, democratizing access to blockchain data.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Challenges We Faced</h2>
        <ul className="list-disc list-inside text-gray-300 max-w-3xl mx-auto">
          <li>
            <strong>Real-Time Data Streaming</strong>: Configuring 0G Chain’s log streaming (e.g., eth_getLogs) and Webhooks for real-time transaction and wallet events was complex due to the need for low-latency updates and robust error handling.
          </li>
          <li>
            <strong>Scalable Data Access</strong>: Ensuring high-throughput data retrieval with 0G Data Availability while maintaining performance for large datasets required optimization of caching and retrieval pipelines.
          </li>
          <li>
            <strong>UI Responsiveness</strong>: Designing a responsive, degen-style UI with Tailwind CSS that supports real-time updates and interactive charts (e.g., transaction volume trends) without compromising performance, especially on mobile, was challenging.
          </li>
          <li>
            <strong>Type Safety</strong>: Ensuring type-safe data handling with TypeScript across blockchain APIs, WebSocket streams, and AI outputs required meticulous schema definitions and validation to prevent runtime errors.
          </li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Technologies We Used</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li><strong>Next.js (App Router)</strong>: For server-side rendering and scalable component-driven development.</li>
              <li><strong>Tailwind CSS</strong>: For responsive, degen-style UI with interactive panels and charts.</li>
              <li><strong>TypeScript</strong>: For type-safe data handling and robust frontend-backend integration.</li>
              <li><strong>Chart.js</strong>: For rendering interactive charts (e.g., transaction volume trends).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Blockchain Interaction</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li><strong>0G Chain</strong>: EVM-compatible blockchain for smart contract execution and event logging.</li>
              <li><strong>0G Compute</strong>: For running AI models for summarization, anomaly detection, and predictions.</li>
              <li><strong>0G Storage</strong>: For secure, decentralized storage of historical data and AI model weights.</li>
              <li><strong>0G Data Availability (DA)</strong>: For scalable, high-throughput data access.</li>
              <li><strong>Viem/Wagmi</strong>: For querying 0G Chain and interacting with smart contracts.</li>
              <li><strong>RainbowKit</strong>: For wallet connections (e.g., Coinbase Wallet, MetaMask).</li>
              <li><strong>Ethers.js</strong>: For parsing and decoding blockchain logs (e.g., ERC-20 events).</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">How We Built It</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          We started with a Next.js project, styling it with Tailwind CSS and securing it with TypeScript for type-safe development. A voting smart contract was crafted using Hardhat and deployed on the 0G Chain to handle onchain events. We integrated 0G Storage for metadata persistence, 0G Compute for AI-driven summarization and anomaly detection, and 0G Data Availability for real-time data streaming. The frontend was built with modular components (Transaction Tracker, Block Explorer, AI Insights) connected via Viem/Wagmi for blockchain interactions. Interactive charts were added using Chart.js, culminating in a fully functional demo that showcases real-time analytics and AI insights.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">What We Learned</h2>
        <ul className="list-disc list-inside text-gray-300 max-w-3xl mx-auto">
          <li><strong>0G’s Modular Power</strong>: The flexibility of 0G’s services (Chain, Compute, Storage, DA) enabled a cohesive, scalable dApp with seamless blockchain and AI integration.</li>
          <li><strong>Real-Time Challenges</strong>: Streaming live blockchain events required optimizing WebSocket connections and data pipelines for low latency and reliability.</li>
          <li><strong>AI on Blockchain</strong>: Running AI models on 0G Compute taught us to balance computational efficiency with meaningful outputs for real-time insights.</li>
          <li><strong>Type Safety Benefits</strong>: TypeScript reduced runtime errors and improved confidence in handling complex blockchain and AI data flows.</li>
          <li><strong>User-Centric Design</strong>: Crafting a degen-style, responsive UI with Tailwind CSS and Chart.js highlighted the importance of balancing aesthetics and performance.</li>
          <li><strong>Community Support</strong>: The 0G team’s documentation and guidance were crucial for navigating their modular infrastructure.</li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">What's Next for 0G-VOE</h2>
        <div className="text-gray-300 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">Wave 4: Advanced AI and Unified Backend</h3>
          <ul className="list-disc list-inside">
            <li>Enhance AI on 0G Compute for predictive analytics (e.g., “Next block’s gas fees”) and gamified features like prediction challenges.</li>
            <li>Build a unified backend pipeline combining 0G Webhooks, eth_getLogs, and eth_call for flexible contract interactions.</li>
            <li>Store AI model weights and large datasets in 0G Storage for efficient retrieval.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">Wave 5: Polished Product and Ecosystem Integration</h3>
          <ul className="list-disc list-inside">
            <li>Polish the UI with interactive charts, leaderboards, and animations using Framer Motion.</li>
            <li>Develop SDKs and CLI tools for developers to query 0G-VOE’s data pipeline.</li>
            <li>Add cross-chain analytics support for other EVM-compatible chains via 0G Chain.</li>
            <li>Deploy on a decentralized CDN (e.g., Fleek) for trustless hosting.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">Long-Term Vision</h3>
          <ul className="list-disc list-inside">
            <li>Expand AI capabilities for narrative context (e.g., “Spike in wallet activity due to DeFi launch”) and personalized alerts.</li>
            <li>Integrate Intelligent NFTs (INFTs) to tokenize AI models or analytics dashboards as tradeable assets.</li>
            <li>Position 0G-VOE as a leading analytics platform for the 0G ecosystem, driving adoption and innovation in decentralized AI.</li>
          </ul>
        </div>
      </section>
      <footer className="text-center text-gray-400">
        <p>Built by <a href="https://github.com/Chidal" className="text-blue-400 hover:underline">Chidal</a> for the 0G WaveHack Challenge</p>
        <p>Repository: <a href="https://github.com/Chidal/OG-VOE" className="text-blue-400 hover:underline">github.com/Chidal/OG-VOE</a></p>
      </footer>
    </div>
  );
}