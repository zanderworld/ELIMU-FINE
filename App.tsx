import React, { useState } from 'react';
import { UserRole } from './types';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import SchoolDashboard from './components/SchoolDashboard';
import ParentDashboard from './components/ParentDashboard';

// Translation dictionary
const translations = {
  en: {
    // Header
    loggedInAs: 'Logged in as:',
    logout: 'Logout',
    // Role Selection
    welcome: 'Welcome to ELIMU FINE',
    tagline: 'Your CBC Learning Companion. Please select your role to continue.',
    student: 'Student',
    studentDesc: 'Access lessons, projects, and competitions.',
    teacher: 'Teacher',
    teacherDesc: 'Build lessons, collaborate, and assess.',
    school: 'School Admin',
    schoolDesc: 'Manage competitions and track analytics.',
    parent: 'Parent',
    parentDesc: 'Monitor progress and support learners.',
  },
  sw: {
    // Header
    loggedInAs: 'Umeingia kama:',
    logout: 'Toka',
    // Role Selection
    welcome: 'Karibu ELIMU FINE',
    tagline: 'Msaidizi wako wa Mtaala wa CBC. Tafadhali chagua jukumu lako ili kuendelea.',
    student: 'Mwanafunzi',
    studentDesc: 'Fikia masomo, miradi, na mashindano.',
    teacher: 'Mwalimu',
    teacherDesc: 'Tengeneza masomo, shiriki, na tathmini.',
    school: 'Msimamizi wa Shule',
    schoolDesc: 'Simamia mashindano na fuatilia takwimu.',
    parent: 'Mzazi',
    parentDesc: 'Fuatilia maendeleo na saidia wanafunzi.',
  },
};

type Language = 'en' | 'sw';
type TranslationKey = keyof typeof translations.en;

const getRoleTranslationKey = (role: UserRole): TranslationKey => {
    switch(role) {
        case UserRole.STUDENT: return 'student';
        case UserRole.TEACHER: return 'teacher';
        case UserRole.SCHOOL: return 'school';
        case UserRole.PARENT: return 'parent';
    }
};

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const handleRoleSelect = (role: UserRole) => {
    setCurrentUserRole(role);
  };

  const handleLogout = () => {
    setCurrentUserRole(null);
  };

  const t = (key: TranslationKey) => translations[language][key] || translations.en[key];

  const renderDashboard = () => {
    switch (currentUserRole) {
      case UserRole.STUDENT:
        return <StudentDashboard />;
      case UserRole.TEACHER:
        return <TeacherDashboard />;
      case UserRole.SCHOOL:
        return <SchoolDashboard />;
      case UserRole.PARENT:
        return <ParentDashboard />;
      default:
        return <RoleSelectionScreen onSelectRole={handleRoleSelect} t={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray font-sans">
      <Header 
        currentUserRole={currentUserRole} 
        onLogout={handleLogout}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      <main>
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
};

interface HeaderProps {
    currentUserRole: UserRole | null;
    onLogout: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const Header: React.FC<HeaderProps> = ({ currentUserRole, onLogout, language, setLanguage, t }) => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://emojicdn.elk.sh/🇰🇪" alt="Kenyan Flag" className="h-8 w-8 mr-3"/>
        <h1 className="text-2xl font-bold text-brand-green">ELIMU FINE</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-6">
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-md ${language === 'en' ? 'bg-brand-green text-white' : 'bg-gray-200'}`}>EN</button>
            <button onClick={() => setLanguage('sw')} className={`px-3 py-1 text-sm rounded-md ml-1 ${language === 'sw' ? 'bg-brand-green text-white' : 'bg-gray-200'}`}>SW</button>
        </div>
        {currentUserRole && (
          <div className="flex items-center">
              <span className="text-gray-600 mr-4">{t('loggedInAs')} <strong>{t(getRoleTranslationKey(currentUserRole))}</strong></span>
              <button onClick={onLogout} className="bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                  {t('logout')}
              </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

const Footer: React.FC = () => (
    <footer className="bg-white mt-12 py-6 text-center text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} ELIMU FINE. Empowering Kenyan Learners. All rights reserved.</p>
    </footer>
);

interface RoleSelectionProps {
    onSelectRole: (role: UserRole) => void;
    t: (key: TranslationKey) => string;
}

const RoleSelectionScreen: React.FC<RoleSelectionProps> = ({ onSelectRole, t }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: 'calc(100vh - 200px)'}}>
      <h2 className="text-4xl font-extrabold text-brand-black mb-2">{t('welcome')}</h2>
      <p className="text-lg text-gray-600 mb-12">{t('tagline')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          <RoleCard role={UserRole.STUDENT} title={t('student')} icon="fa-user-graduate" onSelect={onSelectRole} description={t('studentDesc')} />
          <RoleCard role={UserRole.TEACHER} title={t('teacher')} icon="fa-chalkboard-user" onSelect={onSelectRole} description={t('teacherDesc')} />
          <RoleCard role={UserRole.SCHOOL} title={t('school')} icon="fa-school" onSelect={onSelectRole} description={t('schoolDesc')} />
          <RoleCard role={UserRole.PARENT} title={t('parent')} icon="fa-users" onSelect={onSelectRole} description={t('parentDesc')} />
      </div>
  </div>
);

const RoleCard: React.FC<{ role: UserRole, title: string, icon: string, description: string, onSelect: (role: UserRole) => void }> = ({ role, title, icon, description, onSelect }) => (
    <div onClick={() => onSelect(role)} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 cursor-pointer flex flex-col items-center">
        <i className={`fas ${icon} text-5xl text-brand-green mb-4`}></i>
        <h3 className="text-2xl font-bold text-brand-black mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </div>
);


export default App;