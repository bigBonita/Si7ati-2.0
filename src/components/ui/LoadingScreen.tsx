import React from 'react';
import { Stethoscope } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-50">
      <div className="flex flex-col items-center space-y-4">
        <Stethoscope className="w-16 h-16 text-blue-600 animate-pulse" />
        <h1 className="text-2xl font-semibold text-blue-800">Si7ati</h1>
        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-progressBar"></div>
        </div>
        <p className="text-gray-600">Chargement en cours...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;