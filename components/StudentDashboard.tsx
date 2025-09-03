import React, { useState } from 'react';
import Card from './Card';
import { Lesson, Project, Competition } from '../types';

const mockLessons: Lesson[] = [
    {
        id: 'l1', title: 'Classification of Living Things', strand: 'Science', subStrand: 'Biology',
        content: 'Learn how to classify animals and plants based on their characteristics.',
        quiz: [],
        visualAidUrl: 'https://picsum.photos/seed/science/600/400'
    },
    {
        id: 'l2', title: 'Solving Simple Equations', strand: 'Mathematics', subStrand: 'Algebra',
        content: 'An introduction to basic algebra and how to solve for unknown variables.',
        quiz: [],
        visualAidUrl: 'https://picsum.photos/seed/math/600/400'
    }
];

const mockProjects: Project[] = [
    { 
        id: 'p1', title: 'Build a Water Filter', description: 'Use local materials to build a functional water filter.',
        studentName: 'Student User', submissionType: 'image',
        submissionUrl: 'https://picsum.photos/seed/filter/400/300',
        grade: 'Exceeds Expectations'
    }
];

const mockCompetitions: Competition[] = [
    {
        id: 'c1', title: 'National Science Quiz Bowl', description: 'Test your knowledge against students from across the county.',
        type: 'quiz', participants: 150, leaderboard: [
            { name: 'Nairobi School', score: 95 },
            { name: 'Alliance High', score: 92 },
            { name: 'Your School', score: 88 }
        ]
    }
];

const StudentDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('lessons');

    const renderContent = () => {
        switch (activeTab) {
            case 'lessons': return <StudentLessons />;
            case 'projects': return <StudentProjects />;
            case 'competitions': return <StudentCompetitions />;
            default: return <StudentLessons />;
        }
    };
    
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-brand-black mb-6">Student Dashboard</h2>

            <Card className="mb-8 bg-brand-green text-white">
                <h3 className="text-2xl font-bold mb-2">What do you want to learn today?</h3>
                <p className="mb-4 opacity-90">For example: "Give me a Grade 4 Science lesson on Living Things."</p>
                <div className="flex">
                    <input 
                        type="text" 
                        placeholder="Ask ELIMU FINE..." 
                        className="w-full p-3 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button className="bg-brand-red text-white font-bold py-3 px-6 rounded-r-md hover:bg-red-700 transition-colors">
                        <i className="fas fa-search mr-2"></i>Go
                    </button>
                </div>
            </Card>

            <div className="flex border-b border-gray-200 mb-6">
                <TabButton isActive={activeTab === 'lessons'} onClick={() => setActiveTab('lessons')} icon="fa-book-open">My Lessons</TabButton>
                <TabButton isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon="fa-lightbulb">My Projects</TabButton>
                <TabButton isActive={activeTab === 'competitions'} onClick={() => setActiveTab('competitions')} icon="fa-trophy">Competitions</TabButton>
            </div>
            <div>{renderContent()}</div>
        </div>
    );
};

const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode; icon: string }> = ({ isActive, onClick, children, icon }) => (
    <button onClick={onClick} className={`flex items-center px-4 py-3 text-lg font-medium border-b-4 transition-colors duration-300 ${isActive ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-brand-green'}`}>
        <i className={`fas ${icon} mr-2`}></i>
        {children}
    </button>
);

const StudentLessons: React.FC = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">CBC-Aligned Lessons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLessons.map(lesson => (
                <Card key={lesson.id} className="flex flex-col">
                    <img src={lesson.visualAidUrl} alt={lesson.title} className="rounded-t-lg w-full h-40 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                        <h4 className="font-bold text-xl mb-2">{lesson.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{lesson.strand} &gt; {lesson.subStrand}</p>
                        <p className="text-gray-700 flex-grow">{lesson.content}</p>
                        <button className="mt-4 bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors w-full">Start Lesson</button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const StudentProjects: React.FC = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">Projects & Portfolio</h3>
        <button className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors mb-6">
            <i className="fas fa-plus mr-2"></i>Upload New Project
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.map(project => (
                <Card key={project.id}>
                     <img src={project.submissionUrl} alt={project.title} className="rounded-t-lg w-full h-48 object-cover mb-4" />
                    <h4 className="font-bold text-xl">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="bg-green-100 text-green-800 font-semibold p-3 rounded-md">
                        Grade: {project.grade}
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const StudentCompetitions: React.FC = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">School Competitions</h3>
        {mockCompetitions.map(comp => (
            <Card key={comp.id}>
                <h4 className="font-bold text-2xl text-brand-red">{comp.title}</h4>
                <p className="text-gray-600 mb-4">{comp.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{comp.type.toUpperCase()}</span>
                    <span className="text-gray-500">{comp.participants} Participants</span>
                </div>
                <div>
                    <h5 className="font-semibold mb-2">Leaderboard</h5>
                    <ul className="space-y-1">
                        {comp.leaderboard.map((item, index) => (
                            <li key={index} className={`flex justify-between p-2 rounded ${item.name === 'Your School' ? 'bg-yellow-100' : 'bg-gray-50'}`}>
                                <span>{index+1}. {item.name}</span>
                                <span className="font-bold">{item.score} pts</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        ))}
    </div>
);

export default StudentDashboard;