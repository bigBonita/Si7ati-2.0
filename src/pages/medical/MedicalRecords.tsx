import React, { useState } from 'react';
import { 
  File, 
  Download, 
  Calendar, 
  FileText, 
  Activity, 
  Link as LinkIcon, 
  ExternalLink, 
  Search,
  ChevronDown,
  ChevronUp,
  FileCheck,
  TrendingUp,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';

// Mock medical records data
const mockMedicalRecords = [
  {
    id: 1,
    type: 'Consultation',
    title: 'Consultation Cardiologie',
    doctor: 'Dr. Philippe Martin',
    facility: 'Centre Cardio Paris',
    date: '15 Oct 2025',
    description: 'Examen cardiaque de routine. Tension artérielle: 120/80 mmHg, ECG normal.',
    documents: ['ECG.pdf', 'Recommandations.pdf'],
    expandable: true,
  },
  {
    id: 2,
    type: 'Analyse',
    title: 'Analyse sanguine complète',
    doctor: 'Dr. Marie Dubois',
    facility: 'Laboratoire Central',
    date: '05 Oct 2025',
    description: 'Bilan sanguin complet incluant glycémie, cholestérol, fonction rénale et hépatique.',
    documents: ['ResultatsAnalyse.pdf'],
    expandable: true,
    results: {
      glucose: { value: '5.2 mmol/L', status: 'normal' },
      cholesterol: { value: '4.8 mmol/L', status: 'normal' },
      triglycerides: { value: '1.5 mmol/L', status: 'normal' },
      ALT: { value: '35 U/L', status: 'normal' },
      creatinine: { value: '80 μmol/L', status: 'normal' },
    }
  },
  {
    id: 3,
    type: 'Imagerie',
    title: 'Radiographie Thoracique',
    doctor: 'Dr. Thomas Leroy',
    facility: 'Hôpital Saint-Antoine',
    date: '20 Sept 2025',
    description: 'Radiographie thoracique de contrôle. Pas d\'anomalie détectée.',
    documents: ['RadiographieThorax.jpg', 'CompteRendu.pdf'],
    expandable: true,
  },
  {
    id: 4,
    type: 'Prescription',
    title: 'Renouvellement Traitement',
    doctor: 'Dr. Philippe Martin',
    facility: 'Centre Cardio Paris',
    date: '15 Sept 2025',
    description: 'Renouvellement du traitement pour hypertension. Lisinopril 10mg, 1 comprimé par jour.',
    documents: ['Ordonnance.pdf'],
    expandable: false,
  },
  {
    id: 5,
    type: 'Hospitalisation',
    title: 'Appendicectomie',
    doctor: 'Dr. Sarah Moreau',
    facility: 'Clinique Chirurgicale',
    date: '05 Août 2025',
    description: 'Intervention chirurgicale pour appendicite aiguë. Séjour de 3 jours. Suites opératoires simples.',
    documents: ['CompteRenduChirurgical.pdf', 'ConsignesSortie.pdf'],
    expandable: true,
  },
];

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [expandedRecords, setExpandedRecords] = useState<number[]>([]);
  const [records, setRecords] = useState(mockMedicalRecords);
  
  const recordTypes = ['Tous', 'Consultation', 'Analyse', 'Imagerie', 'Prescription', 'Hospitalisation'];
  
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = selectedType === 'Tous' || record.type === selectedType;
    
    const recordDate = new Date(record.date.split(' ')[0] + ' ' + record.date.split(' ')[1] + ' ' + record.date.split(' ')[2]);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    
    const matchesDateRange = 
      (!startDate || recordDate >= startDate) &&
      (!endDate || recordDate <= endDate);
      
    return matchesSearch && matchesType && matchesDateRange;
  });
  
  const toggleExpand = (id: number) => {
    if (expandedRecords.includes(id)) {
      setExpandedRecords(expandedRecords.filter(recordId => recordId !== id));
    } else {
      setExpandedRecords([...expandedRecords, id]);
    }
  };
  
  const downloadDocument = (recordId: number, document: string) => {
    toast.info(`Téléchargement de ${document} commencé`);
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast.success(`${document} téléchargé avec succès`);
    }, 1500);
  };
  
  const handleRequestDmp = () => {
    toast.info('Demande d\'intégration avec le DMP envoyée');
    setTimeout(() => {
      toast.success('Documents récupérés depuis le DMP avec succès');
      // Simulate adding new records from DMP
      setRecords([
        {
          id: 6,
          type: 'Vaccination',
          title: 'Vaccination COVID-19',
          doctor: 'Dr. Claire Bernard',
          facility: 'Centre de Vaccination Paris',
          date: '10 Jan 2025',
          description: 'Administration du vaccin COVID-19, dose de rappel.',
          documents: ['CertificatVaccination.pdf'],
          expandable: false,
        },
        ...records
      ]);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dossier Médical</h2>
        <button
          onClick={handleRequestDmp}
          className="px-4 py-2 flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm"
        >
          <LinkIcon className="h-4 w-4" />
          <span>Importer depuis le DMP</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Rechercher
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Rechercher par titre, médecin..."
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type de document
            </label>
            <select
              id="type"
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {recordTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Période</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <input
                type="date"
                name="start-date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="end-date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative before:absolute before:inset-0 before:left-8 before:h-full before:w-0.5 before:bg-gray-200 before:content-[''] ml-6 pl-8 space-y-10">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="relative">
              <div className="absolute -left-10 top-2 h-6 w-6 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center">
                {record.type === 'Consultation' && <User className="h-3 w-3 text-white" />}
                {record.type === 'Analyse' && <FileCheck className="h-3 w-3 text-white" />}
                {record.type === 'Imagerie' && <FileText className="h-3 w-3 text-white" />}
                {record.type === 'Prescription' && <File className="h-3 w-3 text-white" />}
                {record.type === 'Hospitalisation' && <Activity className="h-3 w-3 text-white" />}
                {record.type === 'Vaccination' && <TrendingUp className="h-3 w-3 text-white" />}
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div 
                  className={`px-6 py-4 flex justify-between items-center ${record.expandable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  onClick={() => record.expandable && toggleExpand(record.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {record.type}
                      </span>
                      <time className="text-sm text-gray-500">{record.date}</time>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">{record.title}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      {record.doctor} - {record.facility}
                    </div>
                  </div>
                  
                  {record.expandable && (
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      aria-label={expandedRecords.includes(record.id) ? "Réduire" : "Agrandir"}
                    >
                      {expandedRecords.includes(record.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
                
                {(expandedRecords.includes(record.id) || !record.expandable) && (
                  <>
                    <div className="px-6 py-4 border-t border-gray-200">
                      <div className="text-sm text-gray-700">
                        <p>{record.description}</p>
                        
                        {record.type === 'Analyse' && record.results && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Résultats</h4>
                            <div className="bg-gray-50 rounded-md p-3">
                              <table className="min-w-full">
                                <thead>
                                  <tr>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">Paramètre</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">Valeur</th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">Statut</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {Object.entries(record.results).map(([param, { value, status }]) => (
                                    <tr key={param}>
                                      <td className="px-3 py-2 text-sm font-medium text-gray-900">{param}</td>
                                      <td className="px-3 py-2 text-sm text-gray-700">{value}</td>
                                      <td className="px-3 py-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          status === 'normal' ? 'bg-green-100 text-green-800' : 
                                          status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-red-100 text-red-800'
                                        }`}>
                                          {status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {record.documents.length > 0 && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {record.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                              <div className="flex items-center">
                                <File className="h-5 w-5 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-gray-900">{doc}</span>
                              </div>
                              <button
                                onClick={() => downloadDocument(record.id, doc)}
                                className="text-blue-600 hover:text-blue-800"
                                aria-label="Télécharger"
                              >
                                <Download className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-gray-200">
            <div className="flex flex-col items-center">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucun document trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucun document ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* DMP Integration Info */}
      <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3 border border-blue-100">
        <div className="flex-shrink-0">
          <ExternalLink className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-blue-800 font-medium">Intégration avec le DMP</h3>
          <p className="text-blue-700 text-sm mt-1">
            Si7ati est connecté à votre Dossier Médical Partagé. Vous pouvez importer vos documents médicaux depuis le DMP ou partager vos documents Si7ati avec d'autres professionnels de santé.
          </p>
          <div className="mt-2">
            <a 
              href="https://www.dmp.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              En savoir plus sur le DMP
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;