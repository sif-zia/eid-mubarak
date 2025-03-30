'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const EidCelebrationPage = () => {
	const [showInput, setShowInput] = useState(false);
	const [name, setName] = useState('');
	const [recipientName, setRecipientName] = useState('');
	const [copied, setCopied] = useState(false);
	const [confettiTriggered, setConfettiTriggered] = useState(false);
	// Use state to store star configurations
	const [stars, setStars] = useState([]);

	// Generate stars on client-side only
	useEffect(() => {
		// Generate stars only once on the client
		if (stars.length === 0) {
			const starsArray = Array(20).fill(null).map(() => ({
				width: Math.random() * 3 + 1,
				height: Math.random() * 3 + 1,
				top: Math.random() * 100,
				left: Math.random() * 100,
				opacity: Math.random() * 0.7 + 0.3,
				animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`
			}));
			setStars(starsArray);
		}

		// Check for name parameter in URL on component mount
		const searchParams = new URLSearchParams(window.location.search);
		const nameParam = searchParams.get('name');
		if (nameParam) {
			setRecipientName(nameParam);
		}

		// Trigger confetti on first load
		if (!confettiTriggered) {
			triggerConfetti();
			setConfettiTriggered(true);
		}
	}, [confettiTriggered, stars.length]);

	const triggerConfetti = () => {
		const duration = 3 * 1000;
		const animationEnd = Date.now() + duration;
		const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899']; // Changed yellow to blue

		const randomInRange = (min, max) => {
			return Math.random() * (max - min) + min;
		};

		const interval = setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50;
			confetti({
				particleCount,
				spread: 70,
				origin: { y: 0.6 },
				colors: colors,
				disableForReducedMotion: true
			});
			confetti({
				particleCount,
				angle: randomInRange(55, 125),
				spread: 70,
				origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.5) },
				colors: colors,
				disableForReducedMotion: true
			});
		}, 250);
	};

	const copyToClipboard = () => {
		const baseUrl = window.location.origin || 'https://example.com';
		const shareUrl = `${baseUrl}?name=${encodeURIComponent(name)}`;

		navigator.clipboard.writeText(shareUrl).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 3000);
		});
	};

	return (
		<>
			<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-emerald-600/70 to-emerald-900/70">
				{/* Background Image with Gradient Overlay */}
				<div className="absolute inset-0 z-0">
					<img
						src="/background-image.jpg" // Replace with your actual image path
						alt="Background Image"
						className="object-cover w-full h-full opacity-30"
					/>
					<div
						className="absolute inset-0"
						style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))' }}
					></div>
				</div>

				{/* Decorative Elements - Crescent Moon */}
				<div className="absolute top-10 right-10">
					<div className="relative w-16 h-16">
						{/* Main white circle for the crescent moon */}
						<div className="absolute w-16 h-16 rounded-full bg-white" style={{
							boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
							animation: 'float 6s ease-in-out infinite'
						}}></div>
						{/* Overlapping circle to create crescent shape */}
						<div className="absolute w-14 h-14 rounded-full bg-emerald-800/70" style={{
							top: '2px',
							left: '8px',
							animation: 'float 6s ease-in-out infinite'
						}}></div>
					</div>
				</div>

				{/* Arabic Lantern */}
				<div className="absolute top-10 left-10">
					{/* Chain/Rope connecting to top of screen */}
					<div className="w-0.5 h-10 mx-auto bg-yellow-500" style={{
						marginBottom: '-0.1rem'
					}}></div>

					<div className="relative" style={{ animation: 'floatSlow 8s ease-in-out infinite' }}>
						{/* Lantern Top */}
						<div className="w-10 h-3 mx-auto bg-yellow-600 rounded-t-lg"></div>

						{/* Lantern Ring */}
						<div className="w-12 h-2 mx-auto bg-yellow-500 rounded-full" style={{
							boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
						}}></div>

						{/* Lantern Body */}
						<div className="w-14 h-20 mx-auto bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg relative overflow-hidden" style={{
							boxShadow: '0 0 15px rgba(245, 158, 11, 0.7)'
						}}>
							{/* Decorative patterns */}
							<div className="absolute inset-0 opacity-30">
								<div className="w-full h-1 bg-yellow-200 mt-3"></div>
								<div className="w-full h-1 bg-yellow-200 mt-3"></div>
								<div className="w-full h-1 bg-yellow-200 mt-3"></div>
								<div className="w-full h-1 bg-yellow-200 mt-3"></div>
							</div>

							{/* Vertical decorative lines */}
							<div className="absolute inset-0 opacity-30 flex justify-between px-1">
								<div className="w-1 h-full bg-yellow-200"></div>
								<div className="w-1 h-full bg-yellow-200"></div>
								<div className="w-1 h-full bg-yellow-200"></div>
							</div>

							{/* Light glow effect */}
							<div className="absolute inset-0 bg-gradient-to-b from-yellow-200/40 to-transparent" style={{
								animation: 'lanternGlow 3s ease-in-out infinite'
							}}></div>
						</div>

						{/* Lantern Bottom */}
						<div className="w-12 h-2 mx-auto bg-yellow-600 rounded-b-lg"></div>

						{/* Lantern Chain/String (bottom part) */}
						<div className="w-0.5 h-6 mx-auto bg-yellow-500" style={{
							marginTop: '-1.5rem',
							marginBottom: '-0.5rem'
						}}></div>
					</div>
				</div>

				{/* Stars - Now using client-side generated stars from state */}
				<div className="absolute inset-0 overflow-hidden">
					{stars.map((star, i) => (
						<div
							key={i}
							className="absolute bg-white rounded-full"
							style={{
								width: star.width + 'px',
								height: star.height + 'px',
								top: star.top + '%',
								left: star.left + '%',
								opacity: star.opacity,
								animation: star.animation
							}}
						></div>
					))}
				</div>

				{/* Content Container */}
				<div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
					{/* Logo */}
					<div className="mb-8">
						<img
							src="/logo.jpg" // Replace with your actual logo path
							alt="Logo"
							className="w-24 h-24 mx-auto mb-6 rounded-full object-cover border-4 border-blue-300"
							style={{ animation: 'fadeInDown 1s' }}
						/>
					</div>

					{/* Heading */}
					<h1
						className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-wide"
						style={{
							fontFamily: '"Playfair Display", serif',
							animation: 'fadeIn 2s',
							textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
						}}
					>
						<span className="block text-blue-300">Eid Mubarak</span>
						{recipientName && (
							<span className="block mt-2 text-4xl sm:text-5xl text-white limited-bounce">
								{recipientName}!
							</span>
						)}
					</h1>

					{/* School Name Sub-Heading */}
					<p
						className="text-xl sm:text-2xl text-blue-200 mb-6 max-w-3xl mx-auto"
						style={{
							fontFamily: '"Playfair Display", serif',
							animation: 'fadeInUp 1.8s'
						}}
					>
						From J.W. Grammar High School
					</p>

					{/* Subheading */}
					<p
						className="text-xl sm:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto"
						style={{
							fontFamily: '"Playfair Display", serif',
							animation: 'fadeInUp 1.5s'
						}}
					>
						May the blessings of Allah fill your life with happiness, peace, and prosperity
					</p>

					{/* Interactive Elements */}
					{!showInput ? (
						<button
							onClick={() => { setShowInput(true); triggerConfetti(); }}
							className="bg-blue-400 text-emerald-900 px-5 py-2 text-lg font-semibold rounded-full shadow-lg hover:bg-blue-300 transition duration-300"
							style={{
								fontFamily: '"Playfair Display", serif',
								transform: 'scale(1)',
								transition: 'transform 0.3s ease',
								animation: 'pulse 2s infinite'
							}}
							onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
							onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
						>
							Create Your Own
						</button>
					) : (
						<div
							className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/30"
							style={{ animation: 'fadeIn 0.5s' }}
						>
							<div className="flex flex-col sm:flex-row gap-4 items-center">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Name"
									className="w-full px-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 text-emerald-900 font-medium"
									style={{ fontFamily: '"Playfair Display", serif' }}
								/>
								<button
									onClick={copyToClipboard}
									className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-blue-400 text-emerald-900 hover:bg-blue-300'}`}
									style={{ fontFamily: '"Playfair Display", serif' }}
								>
									{copied ? 'Copied!' : 'Copy Link'}
								</button>
							</div>
							<p className="text-white text-sm mt-2 opacity-80">
								Share this link with your loved ones to send them personalized Eid wishes
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Animation keyframes */}
			<style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
          100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes limitedBounce {
          0%, 20%, 40%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-15px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes lanternGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        .limited-bounce {
          animation: limitedBounce 2.5s ease-in-out;
          animation-iteration-count: 1;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
		</>
	);
};

export default EidCelebrationPage;