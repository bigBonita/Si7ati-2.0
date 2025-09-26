import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'patient' | 'doctor') => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  { id: '1', name: 'Patient Test', email: 'patient@example.com', password: 'password', role: 'patient' as const },
  { id: '2', name: 'Dr. Médecin', email: 'doctor@example.com', password: 'password', role: 'doctor' as const },
  { id: '3', name: 'Admin Si7ati', email: 'admin@example.com', password: 'password', role: 'admin' as const }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('si7ati_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Identifiants incorrects');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('si7ati_user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('si7ati_user');
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: 'patient' | 'doctor') => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      throw new Error('Cet email est déjà utilisé');
    }
    
    // In a real app, this would be a server request
    // Mocking the creation of a new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role
    };
    
    setUser(newUser);
    localStorage.setItem('si7ati_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};