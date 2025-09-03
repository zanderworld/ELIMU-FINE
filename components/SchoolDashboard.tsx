import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from './Card';
import { geminiService } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const masteryData = [
  { name: 'Science', mastery: 85, attendance: 95 },
  { name: 'Math', mastery: 72, attendance: 92 },
  { name: 'English', mastery: 88, attendance: 98 },
  { name: 'Kiswahili', mastery: 91, attendance: 96 },
  { name: 'CRE', mastery: 78, attendance: 91 },
];

const SchoolDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('analytics');

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-brand-black mb-6">School Admin Dashboard</h2>
            <div className="flex border-b border-gray-200 mb-6">
                <TabButton isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon="fa-chart-line">Analytics</TabButton>
                <TabButton isActive={activeTab === 'competitions'} onClick={() => setActiveTab('competitions')} icon="fa-trophy">Competitions</TabButton>
                <TabButton isActive={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} icon="fa-award">Certificates</TabButton>
            </div>
            <div>
                {activeTab === 'analytics' && <AnalyticsDashboard />}
                {activeTab === 'competitions' && <CompetitionManager />}
                {activeTab === 'certificates' && <CertificateGenerator />}
            </div>
        </div>
    );
};

const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode; icon: string }> = ({ isActive, onClick, children, icon }) => (
    <button onClick={onClick} className={`flex items-center px-4 py-3 text-lg font-medium border-b-4 transition-colors duration-300 ${isActive ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-brand-green'}`}>
        <i className={`fas ${icon} mr-2`}></i>
        {children}
    </button>
);

const AnalyticsDashboard: React.FC = () => (
    <Card>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">Student Mastery & Engagement</h3>
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart data={masteryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mastery" fill="#008000" name="Mastery (%)" />
                    <Bar dataKey="attendance" fill="#B22222" name="Attendance (%)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

const CompetitionManager: React.FC = () => (
    <Card>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">Manage School Competitions</h3>
        <p className="text-gray-600 mb-6">Host quizzes, project fairs, and innovation showcases to foster a competitive and collaborative spirit.</p>
        <button className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
            <i className="fas fa-plus mr-2"></i>Create New Competition
        </button>
    </Card>
);

const CertificateGenerator: React.FC = () => {
    const [studentName, setStudentName] = useState('Jane Doe');
    const [achievement, setAchievement] = useState('Science Fair Winner 2024');
    const [isLoading, setIsLoading] = useState(false);
    const [certificateText, setCertificateText] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setCertificateText('');
        const text = await geminiService.generateCertificateText(studentName, achievement);
        setCertificateText(text);
        setIsLoading(false);
    };

    return (
        <Card>
            <h3 className="text-2xl font-semibold mb-4 text-brand-black">AI Certificate Generator</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student's Name" className="p-3 border border-gray-300 rounded-md" />
                <input type="text" value={achievement} onChange={(e) => setAchievement(e.target.value)} placeholder="Achievement" className="p-3 border border-gray-300 rounded-md" />
            </div>
            <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-brand-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400">
                {isLoading ? 'Generating...' : 'Generate Certificate'}
            </button>
            {isLoading && <div className="mt-8"><LoadingSpinner message="Generating certificate..."/></div>}
            {certificateText && (
                <div className="mt-8 p-8 border-4 border-yellow-400 bg-yellow-50 rounded-lg text-center font-serif">
                    <h4 className="text-3xl font-bold text-yellow-800">Certificate of Achievement</h4>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto my-4"></div>
                    <p className="text-lg my-6">{certificateText}</p>
                    <div className="flex justify-between items-center mt-8">
                        <p className="text-sm">Issued by: ELIMU FINE Platform</p>
                        <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </Card>
    );
};


export default SchoolDashboard;