import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  Users, 
  Shield, 
  Database, 
  Server, 
  Bell, 
  Eye, 
  EyeOff, 
  Lock, 
  Save,
  RefreshCw,
  Check
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('users');
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [securitySettings, setSecuritySettings] = useState({
    requireMfa: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    accessLogs: true,
  });
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setSecuritySettings({
      ...securitySettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const saveSecuritySettings = () => {
    toast.success('Paramètres de sécurité mis à jour');
  };
  
  const handleImportData = () => {
    setIsImporting(true);
    // Simulate API call
    setTimeout(() => {
      setIsImporting(false);
      toast.success('Données importées avec succès');
    }, 2000);
  };
  
  const handleExportData = () => {
    setIsExporting(true);
    // Simulate API call
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Données exportées avec succès');
    }, 2000);
  };
  
  const handleDeleteUser = (userId: string) => {
    toast.info('Utilisateur en cours de suppression...');
    setTimeout(() => {
      toast.success('Utilisateur supprimé avec succès');
    }, 1000);
  };
  
  const handleLockUser = (userId: string) => {
    toast.info('Compte en cours de verrouillage...');
    setTimeout(() => {
      toast.success('Compte verrouillé avec succès');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Paramètres administrateur</h2>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="users">Utilisateurs</option>
            <option value="security">Sécurité</option>
            <option value="data">Données</option>
            <option value="system">Système</option>
          </select>
        </div>
        
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Users className="mr-2 h-5 w-5" />
                Utilisateurs
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Shield className="mr-2 h-5 w-5" />
                Sécurité
              </button>
              
              <button
                onClick={() => setActiveTab('data')}
                className={`${
                  activeTab === 'data'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Database className="mr-2 h-5 w-5" />
                Données
              </button>
              
              <button
                onClick={() => setActiveTab('system')}
                className={`${
                  activeTab === 'system'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Server className="mr-2 h-5 w-5" />
                Système
              </button>
            </nav>
          </div>
        </div>
        
        <div className="px-6 py-6">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Gestion des utilisateurs</h3>
                <div className="mt-3 sm:mt-0">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Ajouter un utilisateur
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rôle
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: '1', name: 'Dr. Marie Leroy', email: 'dr.leroy@example.com', role: 'Médecin', status: 'Actif' },
                      { id: '2', name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Patient', status: 'Actif' },
                      { id: '3', name: 'Sophie Martin', email: 'sophie.martin@example.com', role: 'Admin', status: 'Actif' },
                      { id: '4', name: 'Pierre Dubois', email: 'pierre.dubois@example.com', role: 'Médecin', status: 'Inactif' },
                      { id: '5', name: 'Léa Bernard', email: 'lea.bernard@example.com', role: 'Patient', status: 'En attente' },
                    ].map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'Médecin' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${user.status === 'Actif' ? 'bg-green-100 text-green-800' : 
                              user.status === 'Inactif' ? 'bg-gray-100 text-gray-800' : 
                              'bg-yellow-100 text-yellow-800'}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            Modifier
                          </button>
                          <button 
                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                            onClick={() => handleLockUser(user.id)}
                          >
                            Verrouiller
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">5</span> sur <span className="font-medium">42</span> utilisateurs
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  <button
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Paramètres de sécurité</h3>
              
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="requireMfa" className="block text-sm font-medium text-gray-700">
                        Authentification à deux facteurs (2FA)
                      </label>
                      <p className="text-sm text-gray-500">
                        Exiger l'authentification à deux facteurs pour tous les utilisateurs
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="requireMfa"
                        name="requireMfa"
                        type="checkbox"
                        checked={securitySettings.requireMfa}
                        onChange={handleSecurityChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                      Délai d'expiration de session (minutes)
                    </label>
                    <select
                      id="sessionTimeout"
                      name="sessionTimeout"
                      value={securitySettings.sessionTimeout}
                      onChange={handleSecurityChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>60 minutes</option>
                      <option value={120}>120 minutes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700">
                      Longueur minimale du mot de passe
                    </label>
                    <select
                      id="passwordMinLength"
                      name="passwordMinLength"
                      value={securitySettings.passwordMinLength}
                      onChange={handleSecurityChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value={6}>6 caractères</option>
                      <option value={8}>8 caractères</option>
                      <option value={10}>10 caractères</option>
                      <option value={12}>12 caractères</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="passwordRequireSpecial" className="block text-sm font-medium text-gray-700">
                        Exiger des caractères spéciaux dans les mots de passe
                      </label>
                      <p className="text-sm text-gray-500">
                        Les mots de passe doivent contenir au moins un caractère spécial (!@#$%^&*)
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="passwordRequireSpecial"
                        name="passwordRequireSpecial"
                        type="checkbox"
                        checked={securitySettings.passwordRequireSpecial}
                        onChange={handleSecurityChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="accessLogs" className="block text-sm font-medium text-gray-700">
                        Journaux d'accès
                      </label>
                      <p className="text-sm text-gray-500">
                        Enregistrer toutes les tentatives de connexion et les actions d'administration
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="accessLogs"
                        name="accessLogs"
                        type="checkbox"
                        checked={securitySettings.accessLogs}
                        onChange={handleSecurityChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Conformité RGPD</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Tous les paramètres de sécurité sont conformes au Règlement Général sur la Protection des Données (RGPD) et aux recommandations de la CNIL.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={saveSecuritySettings}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les paramètres
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Data Tab */}
          {activeTab === 'data' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Gestion des données</h3>
              
              <div className="space-y-6">
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Import et Export</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Importez des données depuis un système externe ou exportez les données pour sauvegarde
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Importer des données</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Formats pris en charge: CSV, XML, JSON
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <button
                          type="button"
                          onClick={handleImportData}
                          disabled={isImporting}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {isImporting ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Importation en cours...
                            </>
                          ) : (
                            <>
                              <Database className="mr-2 h-4 w-4" />
                              Importer des données
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="sm:flex sm:items-center sm:justify-between mt-6 pt-6 border-t border-gray-200">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Exporter les données</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Les données sont exportées au format JSON
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <button
                          type="button"
                          onClick={handleExportData}
                          disabled={isExporting}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          {isExporting ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Exportation en cours...
                            </>
                          ) : (
                            <>
                              <Database className="mr-2 h-4 w-4" />
                              Exporter les données
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Intégrations</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Connectez Si7ati avec d'autres systèmes de santé
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      {[
                        { name: 'Dossier Médical Partagé (DMP)', status: 'Connecté', lastSync: '15 Oct 2025 - 14:30' },
                        { name: 'Assurance Maladie', status: 'Connecté', lastSync: '15 Oct 2025 - 12:15' },
                        { name: 'Système Hospitalier ICD', status: 'Non connecté', lastSync: '-' },
                      ].map((integration, idx) => (
                        <div key={idx} className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                          idx < 2 ? 'border-b border-gray-200' : ''
                        }`}>
                          <dt className="text-sm font-medium text-gray-500">{integration.name}</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  integration.status === 'Connecté' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {integration.status}
                                </span>
                                {integration.status === 'Connecté' && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    Dernière synchronisation: {integration.lastSync}
                                  </span>
                                )}
                              </div>
                              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                                {integration.status === 'Connecté' ? 'Configurer' : 'Connecter'}
                              </button>
                            </div>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* System Tab */}
          {activeTab === 'system' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Paramètres système</h3>
              
              <div className="space-y-6">
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Statut du système</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Vérifiez l'état des composants du système
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      {[
                        { name: 'Base de données', status: 'Opérationnel', details: 'PostgreSQL 14.5', icon: <Database className="h-5 w-5 text-green-500" /> },
                        { name: 'Serveur API', status: 'Opérationnel', details: 'v2.3.0', icon: <Server className="h-5 w-5 text-green-500" /> },
                        { name: 'Intégration DMP', status: 'Opérationnel', details: 'v1.2.1', icon: <Check className="h-5 w-5 text-green-500" /> },
                        { name: 'Système de notification', status: 'Dégradé', details: 'Retards occasionnels', icon: <Bell className="h-5 w-5 text-yellow-500" /> },
                      ].map((component, idx) => (
                        <div key={idx} className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                          idx < 3 ? 'border-b border-gray-200' : ''
                        }`}>
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <span className="mr-2">{component.icon}</span>
                            {component.name}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                component.status === 'Opérationnel' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {component.status}
                              </span>
                              <span className="ml-2 text-gray-500">{component.details}</span>
                            </div>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Paramètres de notification</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Configurez les notifications système
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      {[
                        { id: 'email', name: 'Notifications par email', description: 'Envoyer des alertes système par email' },
                        { id: 'sms', name: 'Notifications par SMS', description: 'Envoyer des alertes système par SMS' },
                        { id: 'maintenance', name: 'Alertes de maintenance', description: 'Notifications pour les maintenances planifiées' },
                      ].map((setting) => (
                        <div key={setting.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={setting.id}
                              name={setting.id}
                              type="checkbox"
                              defaultChecked={setting.id !== 'sms'}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={setting.id} className="font-medium text-gray-700">
                              {setting.name}
                            </label>
                            <p className="text-gray-500">{setting.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les paramètres
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;