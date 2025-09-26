import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Stethoscope } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center max-w-md">
        <Stethoscope className="h-16 w-16 text-blue-600 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          404
        </h1>
        <p className="text-xl font-semibold text-gray-900 mb-2">Page non trouvée</p>
        <p className="text-base text-gray-500 text-center mb-6">
          Désolé, nous n'avons pas pu trouver la page que vous recherchez.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;