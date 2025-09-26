import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  Check,
  Video,
  Phone
} from 'lucide-react';
import { toast } from 'react-toastify';

// Upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Martin',
    specialty: 'Cardiologie',
    facility: 'Centre Cardio Paris',
    address: '15 Avenue de la République, 75011 Paris',
    date: '2025-11-18',
    time: '14:30',
    type: 'Consultation',
    duration: 30,
    status: 'confirmé',
    notes: 'Apporter les résultats des dernières analyses',
    mode: 'en personne',
    room: 'Salle 305'
  },
  {
    id: 2,
    doctor: 'Dr. Dubois',
    specialty: 'Dermatologie',
    facility: 'Clinique de la Peau',
    address: '8 Rue Saint-Honoré, 75001 Paris',
    date: '2025-11-23',
    time: '10:15',
    type: 'Suivi',
    duration: 20,
    status: 'en attente',
    notes: '',
    mode: 'en personne',
    room: 'Salle 112'
  },
  {
    id: 3,
    doctor: 'Dr. Lefèvre',
    specialty: 'Médecine générale',
    facility: 'Cabinet Dr. Lefèvre',
    address: '25 Rue des Lilas, 75019 Paris',
    date: '2025-12-05',
    time: '09:00',
    type: 'Téléconsultation',
    duration: 15,
    status: 'confirmé',
    notes: 'Prévoir un endroit calme pour la visioconférence',
    mode: 'téléconsultation',
    link: 'https://telemedecine.fr/consultation/123456'
  },
];

// Past appointments
const pastAppointments = [
  {
    id: 4,
    doctor: 'Dr. Martin',
    specialty: 'Cardiologie',
    facility: 'Centre Cardio Paris',
    address: '15 Avenue de la République, 75011 Paris',
    date: '2025-10-10',
    time: '11:00',
    type: 'Consultation',
    duration: 30,
    status: 'terminé',
    report: 'Tension artérielle stable. Renouvellement de l\'ordonnance. Contrôle dans 3 mois.',
    mode: 'en personne'
  },
  {
    id: 5,
    doctor: 'Dr. Petit',
    specialty: 'Ophtalmologie',
    facility: 'Centre de Vision',
    address: '12 Boulevard Haussmann, 75009 Paris',
    date: '2025-09-20',
    time: '16:30',
    type: 'Examen de vue',
    duration: 45,
    status: 'terminé',
    report: 'Prescription de nouvelles lunettes. Vision stable par rapport au dernier examen.',
    documents: ['Prescription_lunettes.pdf'],
    mode: 'en personne'
  },
];

// Available appointment slots (for new booking)
const availableSlots = [
  { doctor: 'Dr. Martin', specialty: 'Cardiologie', date: '2025-11-25', slots: ['09:00', '11:30', '14:00', '16:30'] },
  { doctor: 'Dr. Martin', specialty: 'Cardiologie', date: '2025-11-26', slots: ['10:00', '15:30'] },
  { doctor: 'Dr. Dubois', specialty: 'Dermatologie', date: '2025-11-24', slots: ['09:30', '11:00', '14:30'] },
  { doctor: 'Dr. Dubois', specialty: 'Dermatologie', date: '2025-11-27', slots: ['10:30', '13:00', '15:00'] },
  { doctor: 'Dr. Lefèvre', specialty: 'Médecine générale', date: '2025-11-20', slots: ['08:30', '09:45', '11:00', '14:15', '15:30', '16:45'] },
  { doctor: 'Dr. Lefèvre', specialty: 'Médecine générale', date: '2025-11-21', slots: ['08:30', '09:45', '11:00', '14:15', '15:30'] },
];

interface FormattedDate {
  day: string;
  date: string;
  month: string;
  year: string;
  time: string;
}

// Format date for display
const formatDate = (dateStr: string, timeStr: string): FormattedDate => {
  const date = new Date(`${dateStr}T${timeStr}`);
  const day = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
  const dateNum = date.getDate().toString();
  const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
  const year = date.getFullYear().toString();
  const time = timeStr;
  
  return {
    day: day.charAt(0).toUpperCase() + day.slice(1),
    date: dateNum,
    month: month,
    year: year,
    time: time
  };
};

const Appointments: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('Consultation');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('en personne');
  const [bookingStep, setBookingStep] = useState(1);
  
  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(appointmentId => appointmentId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };
  
  const startBooking = () => {
    setIsBookingOpen(true);
    setBookingStep(1);
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('Consultation');
    setAppointmentNotes('');
    setAppointmentMode('en personne');
  };
  
  const closeBooking = () => {
    setIsBookingOpen(false);
  };
  
  const nextStep = () => {
    if (bookingStep === 1 && !selectedDoctor) {
      toast.error('Veuillez sélectionner un médecin');
      return;
    }
    
    if (bookingStep === 2 && (!selectedDate || !selectedTime)) {
      toast.error('Veuillez sélectionner une date et un horaire');
      return;
    }
    
    setBookingStep(bookingStep + 1);
  };
  
  const prevStep = () => {
    setBookingStep(bookingStep - 1);
  };
  
  const confirmBooking = () => {
    toast.success('Votre rendez-vous a été planifié avec succès!');
    setIsBookingOpen(false);
  };
  
  const cancelAppointment = (id: number) => {
    toast.info('Demande d\'annulation envoyée');
    setTimeout(() => {
      toast.success('Rendez-vous annulé avec succès');
    }, 1500);
  };
  
  const confirmAppointment = (id: number) => {
    toast.success('Rendez-vous confirmé');
  };
  
  const renderAppointmentCard = (appointment: any, isPast = false) => {
    const { day, date, month, year, time } = formatDate(appointment.date, appointment.time);
    const isExpanded = expandedIds.includes(appointment.id);
    
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleExpand(appointment.id)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex-1">
              <div className="sm:flex items-center">
                <div className="sm:flex-shrink-0 mb-2 sm:mb-0">
                  <div className="text-center sm:text-left sm:flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center sm:mr-4">
                      {appointment.mode === 'téléconsultation' ? (
                        <Video className="h-6 w-6 text-blue-600" />
                      ) : (
                        <User className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <div className="text-xs text-gray-500">{day}</div>
                      <div className="text-xl font-bold">{date} {month} {year}</div>
                      <div className="text-sm font-medium text-gray-900 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        {time}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:ml-6 mt-4 sm:mt-0">
                  <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <div className="flex items-start mt-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      {appointment.facility}
                      {appointment.mode === 'en personne' && `, ${appointment.address}`}
                      {appointment.mode === 'téléconsultation' && ` (Téléconsultation)`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                appointment.status === 'confirmé' ? 'bg-green-100 text-green-800' : 
                appointment.status === 'en attente' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {appointment.status}
              </span>
              <button className="text-gray-400">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Type de rendez-vous</h4>
                  <p>{appointment.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Durée</h4>
                  <p>{appointment.duration} minutes</p>
                </div>
                {appointment.mode === 'en personne' && appointment.room && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Salle</h4>
                    <p>{appointment.room}</p>
                  </div>
                )}
                {appointment.mode === 'téléconsultation' && appointment.link && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Lien de téléconsultation</h4>
                    <a 
                      href={appointment.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Accéder à la téléconsultation
                    </a>
                  </div>
                )}
              </div>
              
              {appointment.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Informations complémentaires</h4>
                  <p className="mt-1 text-gray-700">{appointment.notes}</p>
                </div>
              )}
              
              {isPast && appointment.report && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Compte-rendu</h4>
                  <p className="mt-1 text-gray-700">{appointment.report}</p>
                </div>
              )}
              
              {isPast && appointment.documents && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                  <div className="mt-2 space-y-2">
                    {appointment.documents.map((doc: string, idx: number) => (
                      <div key={idx} className="flex items-center p-2 bg-white rounded border border-gray-200">
                        <FileText className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">{doc}</span>
                        <button className="ml-auto text-blue-600 hover:text-blue-800">
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!isPast && (
                <div className="flex space-x-3 pt-2">
                  {appointment.status === 'en attente' ? (
                    <button
                      onClick={() => confirmAppointment(appointment.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirmer
                    </button>
                  ) : null}
                  
                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                    className={`${appointment.status === 'en attente' ? 'flex-1' : 'w-full'} px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center`}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderBookingStep = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Choisir un médecin</h3>
            <div className="grid gap-4">
              {Array.from(new Set(availableSlots.map(slot => slot.doctor))).map((doctor, idx) => {
                const doctorInfo = availableSlots.find(slot => slot.doctor === doctor);
                return (
                  <div 
                    key={idx}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedDoctor === doctor ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doctor}</h4>
                        <p className="text-sm text-gray-600">{doctorInfo?.specialty}</p>
                      </div>
                      {selectedDoctor === doctor && (
                        <Check className="ml-auto h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 2:
        const doctorSlots = availableSlots.filter(slot => slot.doctor === selectedDoctor);
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Choisir une date et un horaire</h3>
              <p className="text-sm text-gray-600 mt-1">Rendez-vous avec {selectedDoctor}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {doctorSlots.map((slot, idx) => {
                    const date = new Date(slot.date);
                    const formattedDay = date.getDate();
                    const formattedMonth = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(date);
                    const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date);
                    
                    return (
                      <div 
                        key={idx}
                        className={`p-3 border rounded-lg text-center cursor-pointer ${
                          selectedDate === slot.date ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedDate(slot.date)}
                      >
                        <div className="text-xs text-gray-600">{dayName}</div>
                        <div className="text-lg font-semibold">{formattedDay}</div>
                        <div className="text-sm">{formattedMonth}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horaire</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {doctorSlots
                      .find(slot => slot.date === selectedDate)?.slots
                      .map((time, idx) => (
                        <div 
                          key={idx}
                          className={`py-2 px-3 border rounded-lg text-center cursor-pointer ${
                            selectedTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Détails du rendez-vous</h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedDoctor} - {
                  new Date(selectedDate).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })
                } à {selectedTime}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700">
                  Type de rendez-vous
                </label>
                <select
                  id="appointmentType"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Consultation</option>
                  <option>Suivi</option>
                  <option>Examen</option>
                  <option>Vaccination</option>
                  <option>Autre</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="appointmentMode" className="block text-sm font-medium text-gray-700">
                  Mode de consultation
                </label>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  <div 
                    className={`p-3 border rounded-lg flex items-center justify-center cursor-pointer ${
                      appointmentMode === 'en personne' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setAppointmentMode('en personne')}
                  >
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    <span>En personne</span>
                  </div>
                  <div 
                    className={`p-3 border rounded-lg flex items-center justify-center cursor-pointer ${
                      appointmentMode === 'téléconsultation' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setAppointmentMode('téléconsultation')}
                  >
                    <Video className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Téléconsultation</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="appointmentNotes" className="block text-sm font-medium text-gray-700">
                  Notes (symptômes, questions, etc.)
                </label>
                <textarea
                  id="appointmentNotes"
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez vos symptômes ou la raison de votre visite..."
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Confirmation</h3>
              <p className="text-sm text-gray-600 mt-1">Veuillez vérifier les détails de votre rendez-vous</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Médecin</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedDoctor}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric',
                      weekday: 'long'
                    })}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Heure</dt>
                  <dd className="text-sm font-medium text-gray-900">{selectedTime}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="text-sm font-medium text-gray-900">{appointmentType}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Mode</dt>
                  <dd className="text-sm font-medium text-gray-900">{appointmentMode === 'en personne' ? 'En personne' : 'Téléconsultation'}</dd>
                </div>
                {appointmentNotes && (
                  <div className="py-3">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{appointmentNotes}</dd>
                  </div>
                )}
              </dl>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Informations importantes</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Veuillez vous présenter 10 minutes avant l'heure de votre rendez-vous</li>
                    <li>N'oubliez pas votre carte vitale et votre carte de mutuelle</li>
                    <li>Vous pouvez annuler ou modifier votre rendez-vous jusqu'à 24h avant</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Rendez-vous</h2>
        <button
          onClick={startBooking}
          className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Prendre rendez-vous
        </button>
      </div>
      
      {/* Upcoming appointments */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rendez-vous à venir</h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id}>
                {renderAppointmentCard(appointment)}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-gray-200">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Pas de rendez-vous à venir</h3>
            <p className="text-gray-500">Planifiez un nouveau rendez-vous avec un médecin</p>
            <button
              onClick={startBooking}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Prendre rendez-vous
            </button>
          </div>
        )}
      </div>
      
      {/* Past appointments */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des rendez-vous</h3>
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map(appointment => (
              <div key={appointment.id}>
                {renderAppointmentCard(appointment, true)}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-gray-200">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Aucun historique</h3>
            <p className="text-gray-500">Vous n'avez pas encore eu de rendez-vous</p>
          </div>
        )}
      </div>
      
      {/* Booking modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={closeBooking}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div>
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex-1 flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          step < bookingStep ? 'bg-blue-600' : 
                          step === bookingStep ? 'bg-blue-600' : 
                          'bg-gray-200'
                        }`}>
                          {step < bookingStep ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : (
                            <span className={`text-xs font-medium ${step === bookingStep ? 'text-white' : 'text-gray-500'}`}>
                              {step}
                            </span>
                          )}
                        </div>
                        {step < 4 && (
                          <div className={`h-1 flex-1 ${step < bookingStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-center w-12 -ml-3">Médecin</div>
                    <div className="text-xs text-center w-12 -ml-3">Date</div>
                    <div className="text-xs text-center w-12 -ml-3">Détails</div>
                    <div className="text-xs text-center w-20 -ml-6">Confirmation</div>
                  </div>
                </div>
                
                {renderBookingStep()}
                
                <div className="mt-8 flex justify-between">
                  {bookingStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Précédent
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {bookingStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={confirmBooking}
                      className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Confirmer le rendez-vous
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;