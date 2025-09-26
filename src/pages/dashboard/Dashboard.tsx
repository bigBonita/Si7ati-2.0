import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Calendar, Users, FileText, AlertTriangle, Clock, Settings } from 'lucide-react';

// Mock data
const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Martin', specialty: 'Cardiologie', date: '18 Nov 2025', time: '14:30' },
  { id: 2, doctor: 'Dr. Dubois', specialty: 'Dermatologie', date: '23 Nov 2025', time: '10:15' },
];

const recentPrescriptions = [
  { id: 1, medication: 'Amoxicilline', dosage: '500mg', frequency: '3x par jour', doctor: 'Dr. Martin', date: '10 Oct 2025' },
  { id: 2, medication: 'Doliprane', dosage: '1000mg', frequency: 'Si douleur', doctor: 'Dr. Dubois', date: '05 Oct 2025' },
];

const healthMetrics = [
  { name: 'Tension artérielle', value: '120/80', status: 'normal', date: '15 Oct 2025' },
  { name: 'Glycémie', value: '5.6 mmol/L', status: 'normal', date: '10 Oct 2025' },
  { name: 'IMC', value: '24.5', status: 'normal', date: '01 Oct 2025' },
];

const RecentActivity = () => (
  <div className="relative">
    <div className="absolute left-3 h-full w-0.5 bg-gray-200"></div>
    <ul className="ml-6 space-y-6">
      {[
        { icon: <Calendar className="h-5 w-5 text-blue-500" />, title: 'Rendez-vous programmé', description: 'Consultation avec Dr. Martin', time: 'Il y a 2 jours' },
        { icon: <FileText className="h-5 w-5 text-green-500" />, title: 'Nouveau document ajouté', description: 'Résultats analyses sanguines', time: 'Il y a 5 jours' },
        { icon: <Activity className="h-5 w-5 text-red-500" />, title: 'Mise à jour de vos données', description: 'Mise à jour des médicaments', time: 'Il y a 1 semaine' },
      ].map((item, idx) => (
        <li key={idx} className="relative">
          <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-white bg-white flex items-center justify-center">
            {item.icon}
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const PatientDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Prochain RDV</h3>
              <p className="text-gray-500 text-sm">Dans 3 jours</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Dr. Martin - Cardiologie</p>
            <p className="text-gray-600">18 Nov 2025 à 14:30</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FileText className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Ordonnances</h3>
              <p className="text-gray-500 text-sm">2 actives</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Amoxicilline</p>
            <p className="text-gray-600">Jusqu'au 20 Nov 2025</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Alertes</h3>
              <p className="text-gray-500 text-sm">1 importante</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Rappel vaccin</p>
            <p className="text-gray-600">À effectuer avant le 30 Nov</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Évolution de votre santé</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Graphique de tendances sanitaires à venir</p>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Rendez-vous à venir</h3>
            <div className="divide-y divide-gray-200">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                Voir tous les rendez-vous
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Ordonnances récentes</h3>
            <div className="divide-y divide-gray-200">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="py-3">
                  <div className="flex justify-between">
                    <p className="font-medium">{prescription.medication}</p>
                    <p className="text-sm text-gray-500">{prescription.date}</p>
                  </div>
                  <p className="text-sm text-gray-500">{prescription.dosage} - {prescription.frequency}</p>
                  <p className="text-sm text-gray-500">Prescrit par: {prescription.doctor}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                Voir toutes les ordonnances
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Mesures de santé</h3>
            <div className="space-y-4">
              {healthMetrics.map((metric, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-xs text-gray-500">Mis à jour le {metric.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{metric.value}</p>
                    <p className={`text-xs ${
                      metric.status === 'normal' ? 'text-green-600' : 
                      metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Ajouter une mesure
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Patients aujourd'hui</h3>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Clock className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Prochain patient</h3>
              <p className="text-2xl font-bold text-gray-900">15 min</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FileText className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Rapports en attente</h3>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Planning du jour</h3>
            <div className="divide-y divide-gray-200">
              {[
                { time: '09:00', patient: 'Jean Dupont', reason: 'Consultation de routine', status: 'terminé' },
                { time: '10:30', patient: 'Marie Lambert', reason: 'Suivi traitement', status: 'terminé' },
                { time: '13:15', patient: 'Thomas Bernard', reason: 'Première consultation', status: 'en cours' },
                { time: '14:30', patient: 'Sophie Martin', reason: 'Résultats examens', status: 'à venir' },
                { time: '16:00', patient: 'Lucas Moreau', reason: 'Suivi post-opératoire', status: 'à venir' },
              ].map((appointment, idx) => (
                <div key={idx} className="py-3 flex items-center">
                  <div className="w-16 font-medium">{appointment.time}</div>
                  <div className="flex-1 ml-4">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-gray-500">{appointment.reason}</p>
                  </div>
                  <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'terminé' ? 'bg-gray-100 text-gray-800' : 
                      appointment.status === 'en cours' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Rapports récents</h3>
            <div className="divide-y divide-gray-200">
              {[
                { patient: 'Emma Petit', type: 'Résultats IRM', date: '15 Oct 2025', status: 'urgent' },
                { patient: 'Paul Rousseau', type: 'Analyses biologiques', date: '14 Oct 2025', status: 'normal' },
                { patient: 'Julie Leclerc', type: 'Radiographie', date: '12 Oct 2025', status: 'normal' },
              ].map((report, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{report.patient}</p>
                    <p className="text-sm text-gray-500">{report.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{report.date}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Patient actuel</h3>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-semibold">
                TB
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold">Thomas Bernard</h4>
                <p className="text-gray-500">32 ans, Homme</p>
              </div>
            </div>
            <div className="space-y-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-gray-500">Motif de consultation</h5>
                <p>Première consultation - Maux de tête fréquents</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500">Antécédents</h5>
                <p>Appendicectomie (2020), Allergie au pollen</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500">Dernière visite</h5>
                <p>Première consultation</p>
              </div>
            </div>
            <div className="space-x-2">
              <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Voir dossier complet
              </button>
              <button className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Notes
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                { title: 'Demande de consultation', message: 'Nouvelle demande de Mme Rivière', time: 'Il y a 30 min', urgent: false },
                { title: 'Résultats disponibles', message: 'Les analyses de M. Dupont sont prêtes', time: 'Il y a 2h', urgent: true },
                { title: 'Rappel réunion', message: 'Réunion de service à 17h', time: 'Il y a 5h', urgent: false },
              ].map((notification, idx) => (
                <div key={idx} className={`p-3 rounded-md ${notification.urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Utilisateurs</h3>
              <p className="text-2xl font-bold text-gray-900">1,254</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-green-600">+12% </span>
            <span className="text-sm text-gray-500">par rapport au mois dernier</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Rendez-vous</h3>
              <p className="text-2xl font-bold text-gray-900">845</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-green-600">+5% </span>
            <span className="text-sm text-gray-500">par rapport au mois dernier</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Activity className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Activité</h3>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-red-600">-2% </span>
            <span className="text-sm text-gray-500">par rapport au mois dernier</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FileText className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">Documents</h3>
              <p className="text-2xl font-bold text-gray-900">3,642</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-green-600">+8% </span>
            <span className="text-sm text-gray-500">par rapport au mois dernier</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Activité utilisateurs</h3>
              <div>
                <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Cette semaine</option>
                  <option>Ce mois</option>
                  <option>Cette année</option>
                </select>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Graphique d'activité à venir</p>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Utilisateurs récents</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Établissement
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inscrit le
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: 'Dr. Marie Leroy', role: 'Médecin', facility: 'CHU Nantes', date: '15 Oct 2025', status: 'Actif' },
                    { name: 'Philippe Durand', role: 'Patient', facility: 'N/A', date: '14 Oct 2025', status: 'Actif' },
                    { name: 'Dr. Thomas Petit', role: 'Médecin', facility: 'Clinique St. Joseph', date: '10 Oct 2025', status: 'En attente' },
                    { name: 'Céline Martin', role: 'Admin', facility: 'Hôpital Américain', date: '05 Oct 2025', status: 'Actif' },
                  ].map((user, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{user.facility}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {user.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Alertes système</h3>
            <div className="space-y-4">
              {[
                { title: 'Mise à jour disponible', description: 'Nouvelle version 2.4.1 disponible', time: 'Il y a 30 min', priority: 'medium' },
                { title: 'Sauvegarde automatique', description: 'Sauvegarde quotidienne terminée', time: 'Il y a 2h', priority: 'low' },
                { title: 'Pic d\'utilisation', description: 'Usage du serveur à 85%', time: 'Il y a 4h', priority: 'high' },
              ].map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-md ${
                  alert.priority === 'high' ? 'bg-red-50 border border-red-100' : 
                  alert.priority === 'medium' ? 'bg-yellow-50 border border-yellow-100' : 
                  'bg-green-50 border border-green-100'
                }`}>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{alert.title}</h4>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Intégrations système</h3>
            <div className="space-y-4">
              {[
                { name: 'Dossier Médical Partagé', status: 'Connecté', lastSync: '15 Oct 2025 - 14:30' },
                { name: 'Système Hospitalier ICD', status: 'Connecté', lastSync: '15 Oct 2025 - 12:15' },
                { name: 'Assurance Maladie', status: 'Erreur', lastSync: '14 Oct 2025 - 10:45' },
                { name: 'Laboratoire Central', status: 'Connecté', lastSync: '13 Oct 2025 - 16:20' },
              ].map((integration, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-xs text-gray-500">Dernière synchro: {integration.lastSync}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    integration.status === 'Connecté' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {integration.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <span className="font-medium text-blue-700">Exporter les rapports</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                <span className="font-medium text-green-700">Gérer les utilisateurs</span>
                <Users className="w-5 h-5 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
                <span className="font-medium text-purple-700">Configuration système</span>
                <Settings className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  } else if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  
  // Default to patient dashboard
  return <PatientDashboard />;
};

export default Dashboard;