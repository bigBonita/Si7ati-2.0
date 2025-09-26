import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, Edit2, AlertTriangle, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const PatientProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock patient data
  const [patientData, setPatientData] = useState({
    name: user?.name || 'Patient Test',
    email: user?.email || 'patient@example.com',
    dateOfBirth: '15/05/1985',
    gender: 'Homme',
    socialSecurityNumber: '1 85 05 75 123 456 78',
    address: '123 Rue de Paris, 75001 Paris',
    phone: '06 12 34 56 78',
    emergencyContact: {
      name: 'Marie Dupont',
      relationship: 'Épouse',
      phone: '06 98 76 54 32'
    },
    bloodType: 'A+',
    allergies: ['Pénicilline', 'Arachides'],
    chronicConditions: ['Hypertension', 'Diabète type 2'],
    currentMedications: ['Lisinopril 10mg', 'Metformine 500mg'],
  });
  
  const [editedData, setEditedData] = useState({ ...patientData });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedData({
        ...editedData,
        [parent]: {
          ...editedData[parent as keyof typeof editedData] as Record<string, unknown>,
          [child]: value
        }
      });
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };
  
  const handleMultipleInputChange = (field: string, value: string) => {
    const valueArray = value.split(',').map(item => item.trim()).filter(Boolean);
    setEditedData({ ...editedData, [field]: valueArray });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setPatientData(editedData);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Profil Patient</h2>
        <button
          onClick={() => {
            if (isEditing) {
              setEditedData(patientData);
            }
            setIsEditing(!isEditing);
          }}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            isEditing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEditing ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span>Annuler</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              <span>Modifier</span>
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h3 className="text-lg font-medium text-blue-900">Informations personnelles</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  disabled={!isEditing}
                  value={isEditing ? editedData.name : patientData.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled={!isEditing}
                  value={isEditing ? editedData.email : patientData.email}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date de naissance
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  disabled={!isEditing}
                  value={isEditing ? editedData.dateOfBirth : patientData.dateOfBirth}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  disabled={!isEditing}
                  value={isEditing ? editedData.gender : patientData.gender}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option>Homme</option>
                  <option>Femme</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="socialSecurityNumber" className="block text-sm font-medium text-gray-700">
                Numéro de sécurité sociale
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="socialSecurityNumber"
                  id="socialSecurityNumber"
                  disabled={!isEditing}
                  value={isEditing ? editedData.socialSecurityNumber : patientData.socialSecurityNumber}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  disabled={!isEditing}
                  value={isEditing ? editedData.address : patientData.address}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  disabled={!isEditing}
                  value={isEditing ? editedData.phone : patientData.phone}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h3 className="text-lg font-medium text-blue-900">Contact d'urgence</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="emergencyContact.name"
                  id="emergencyContact.name"
                  disabled={!isEditing}
                  value={isEditing ? editedData.emergencyContact.name : patientData.emergencyContact.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700">
                Relation
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  id="emergencyContact.relationship"
                  disabled={!isEditing}
                  value={isEditing ? editedData.emergencyContact.relationship : patientData.emergencyContact.relationship}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="emergencyContact.phone"
                  id="emergencyContact.phone"
                  disabled={!isEditing}
                  value={isEditing ? editedData.emergencyContact.phone : patientData.emergencyContact.phone}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 bg-blue-50 px-6 py-4">
            <h3 className="text-lg font-medium text-blue-900">Informations médicales</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                Groupe sanguin
              </label>
              <div className="mt-1">
                <select
                  id="bloodType"
                  name="bloodType"
                  disabled={!isEditing}
                  value={isEditing ? editedData.bloodType : patientData.bloodType}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies (séparées par des virgules)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="allergies"
                  id="allergies"
                  disabled={!isEditing}
                  value={isEditing ? editedData.allergies.join(', ') : patientData.allergies.join(', ')}
                  onChange={(e) => handleMultipleInputChange('allergies', e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700">
                Conditions chroniques (séparées par des virgules)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="chronicConditions"
                  id="chronicConditions"
                  disabled={!isEditing}
                  value={isEditing ? editedData.chronicConditions.join(', ') : patientData.chronicConditions.join(', ')}
                  onChange={(e) => handleMultipleInputChange('chronicConditions', e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700">
                Médicaments actuels (séparés par des virgules)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="currentMedications"
                  id="currentMedications"
                  disabled={!isEditing}
                  value={isEditing ? editedData.currentMedications.join(', ') : patientData.currentMedications.join(', ')}
                  onChange={(e) => handleMultipleInputChange('currentMedications', e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setEditedData(patientData);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          )}
        </form>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Check className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-blue-800 font-medium">Confidentialité des données</h3>
          <p className="text-blue-700 text-sm">
            Vos données sont protégées conformément au RGPD. Vous pouvez demander la suppression ou l'accès à vos données à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;