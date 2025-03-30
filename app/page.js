'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LandingPage from '../components/LandingPage';

// Stylized loading component
function StylizedLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700">Loading your Eid greetings...</h3>
        <p className="text-gray-500 mt-2">Just a moment while we prepare something special</p>
      </div>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return <LandingPage name={name} />;
}

export default function Home() {
  return (
    <Suspense fallback={<StylizedLoading />}>
      <HomeContent />
    </Suspense>
  );
}