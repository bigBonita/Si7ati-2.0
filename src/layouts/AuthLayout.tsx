import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 text-white p-10 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Si7ati</h1>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Votre dossier médical, simplifié et sécurisé</h2>
          <p className="text-xl opacity-90">
            Accédez à vos informations médicales en toute sécurité, prenez rendez-vous avec vos médecins et gérez votre santé en un seul endroit.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Accessible</h3>
              <p className="opacity-80">Consultez vos données médicales où que vous soyez</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Sécurisé</h3>
              <p className="opacity-80">Protection des données conformes au RGPD</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Intégré</h3>
              <p className="opacity-80">Compatible avec le DMP et les systèmes hospitaliers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Intuitif</h3>
              <p className="opacity-80">Interface simple et agréable à utiliser</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm opacity-70">
          © 2025 Si7ati - Tous droits réservés
        </p>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="md:hidden flex items-center space-x-2 mb-8">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-800">Si7ati</h1>
        </div>
        
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;