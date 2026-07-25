import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 mb-6">
          <Layers className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-2xl font-bold text-gray-200 mt-2">Page Not Found</h2>
        <p className="text-gray-400 text-sm max-w-md mt-2 mb-8">
          The requested page does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
