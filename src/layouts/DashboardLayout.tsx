import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  User, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Stethoscope, 
  Bell
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Tableau de bord', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Profil', icon: <User className="w-5 h-5" />, path: '/profile' },
    { name: 'Dossier médical', icon: <FileText className="w-5 h-5" />, path: '/medical-records' },
    { name: 'Rendez-vous', icon: <Calendar className="w-5 h-5" />, path: '/appointments' },
  ];

  // Only show settings for admin
  if (user?.role === 'admin') {
    menuItems.push({ name: 'Paramètres', icon: <Settings className="w-5 h-5" />, path: '/settings' });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm fixed top-0 w-full z-10 flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-bold text-blue-800">Si7ati</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50">
          <div className="h-full w-64 bg-white p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-6 w-6 text-blue-600" />
                <h1 className="text-lg font-bold text-blue-800">Si7ati</h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-6">
              <Stethoscope className="h-7 w-7 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-blue-800">Si7ati</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="group flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Desktop Header */}
        <div className="hidden md:flex sticky top-0 z-10 flex-shrink-0 h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Bonjour, {user?.name}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="ml-2 hidden md:block text-sm font-medium text-gray-700">
                    {user?.role === 'patient' ? 'Patient' : user?.role === 'doctor' ? 'Médecin' : 'Administrateur'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="pt-2 md:pt-6 pb-8 px-4 md:px-8 mt-14 md:mt-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;