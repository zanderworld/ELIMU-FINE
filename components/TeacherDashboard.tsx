import React, { useState, useMemo } from 'react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { geminiService } from '../services/geminiService';
import { ForumPost, Lesson, UserRole, SharedResource } from '../types';

const mockForumPosts: ForumPost[] = [
  {
    id: 'p1', author: 'Jane Doe', role: UserRole.TEACHER, title: "How do I teach fractions without textbooks?",
    content: "My school has very limited resources, and I'm struggling to find engaging ways to teach fractions to my Grade 4 class. Any practical ideas?",
    replies: [{ author: 'John Smith', content: "You can use everyday objects like fruits or a loaf of bread! Dividing them physically helps students grasp the concept."}]
  },
  {
    id: 'p2', author: 'Peter Jones', role: UserRole.TEACHER, title: "Managing large class sizes during projects",
    content: "With over 60 students, group projects often become chaotic. What are some effective strategies for managing large classes during collaborative work?",
    replies: [{ author: 'Mary Ann', content: "Assign clear roles to each group member (e.g., leader, scribe, presenter). It creates structure and accountability." }]
  }
];

const initialSharedResources: SharedResource[] = [
    { id: 'res1', title: 'Grade 6 Science - Water Cycle Worksheet', uploader: 'Mary Ann', type: 'Worksheet', subject: 'Science', grade: '6' },
    { id: 'res2', title: 'Junior Sec. History Lesson Plan - The Scramble for Africa', uploader: 'John Smith', type: 'Lesson Plan', subject: 'History', grade: '8' },
    { id: 'res3', title: 'Grade 4 Math Assessment - Fractions', uploader: 'Peter Jones', type: 'Assessment', subject: 'Mathematics', grade: '4' },
];

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hub');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'builder':
        return <LessonBuilder />;
      case 'hub':
        return <TeacherHub />;
      case 'toolkit':
        return <AssessmentToolkit />;
      default:
        return <LessonBuilder />;
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-brand-black mb-6">Teacher Dashboard</h2>
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton isActive={activeTab === 'builder'} onClick={() => setActiveTab('builder')} icon="fa-flask-vial">Lesson & Test Builder</TabButton>
        <TabButton isActive={activeTab === 'hub'} onClick={() => setActiveTab('hub')} icon="fa-users">Teacher Hub</TabButton>
        <TabButton isActive={activeTab === 'toolkit'} onClick={() => setActiveTab('toolkit')} icon="fa-clipboard-check">Assessment Toolkit</TabButton>
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

// FIX: Completed the LessonBuilder component, which was previously unfinished, causing syntax and type errors.
// This component now includes state management for the form inputs, loading and error states, and renders the generated lesson content.
const LessonBuilder: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [grade, setGrade] = useState('4');
    const [isLoading, setIsLoading] = useState(false);
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateLesson = async () => {
        if (!topic.trim()) {
            setError('Please enter a topic to generate a lesson.');
            return;
        }
        setIsLoading(true);
        setLesson(null);
        setError(null);
        try {
            const newLesson = await geminiService.generateLesson(topic, grade);
            setLesson(newLesson);
        } catch (err) {
            setError('An error occurred while generating the lesson. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card>
            <h3 className="text-2xl font-semibold mb-4 text-brand-black">AI-Powered Lesson Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter lesson topic (e.g., Photosynthesis)" 
                    className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <select 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md bg-white"
                >
                    {[...Array(8)].map((_, i) => <option key={i+1} value={i+1}>Grade {i+1}</option>)}
                </select>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button 
                onClick={handleGenerateLesson} 
                disabled={isLoading}
                className="w-full bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
                {isLoading ? 'Generating Lesson...' : 'Generate with AI'}
            </button>

            {isLoading && (
                <div className="mt-8">
                    <LoadingSpinner message="Crafting your lesson..." />
                </div>
            )}

            {lesson && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-2xl font-bold text-brand-green mb-2">{lesson.title}</h3>
                    <div className="flex space-x-4 text-sm text-gray-500 mb-4">
                        <span><strong>Strand:</strong> {lesson.strand}</span>
                        <span><strong>Sub-Strand:</strong> {lesson.subStrand}</span>
                    </div>
                    {lesson.visualAidUrl && <img src={lesson.visualAidUrl} alt={lesson.title} className="rounded-lg w-full h-64 object-cover mb-4" />}
                    <p className="text-gray-700 mb-6">{lesson.content}</p>

                    <h4 className="text-xl font-semibold mb-3">Quick Quiz</h4>
                    <div className="space-y-4">
                        {lesson.quiz.map((q, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md">
                                <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                                <div className="flex flex-col space-y-1">
                                    {q.options.map(opt => (
                                        <span key={opt} className={`p-2 rounded ${opt === q.correctAnswer ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
                                            {opt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

// FIX: Defined the TeacherHub component, which was missing and causing a 'Cannot find name' error.
const TeacherHub: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredResources = useMemo(() => 
        initialSharedResources.filter(res => 
            res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.grade.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h3 className="text-2xl font-semibold mb-4 text-brand-black">Shared Resources</h3>
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Search resources by title, subject, or grade..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                </div>
                <div className="space-y-4">
                    {filteredResources.map(resource => (
                        <Card key={resource.id} className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg">{resource.title}</h4>
                                <p className="text-sm text-gray-500">
                                    {resource.type} | Subject: {resource.subject} | Grade: {resource.grade} | By: {resource.uploader}
                                </p>
                            </div>
                            <button className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                <i className="fas fa-download mr-2"></i>Download
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-black">Community Forum</h3>
                 <div className="space-y-4">
                    {mockForumPosts.map(post => (
                        <Card key={post.id}>
                            <h4 className="font-bold text-lg">{post.title}</h4>
                            <p className="text-sm text-gray-500 mb-2">By {post.author} ({post.role})</p>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            <div className="bg-gray-100 p-3 rounded-md">
                                <p className="font-semibold text-sm text-gray-800">Reply from {post.replies[0].author}:</p>
                                <p className="text-sm text-gray-600">"{post.replies[0].content}"</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

// FIX: Defined the AssessmentToolkit component, which was missing and causing a 'Cannot find name' error.
const AssessmentToolkit: React.FC = () => (
    <Card>
        <h3 className="text-2xl font-semibold mb-4 text-brand-black">Assessment Toolkit</h3>
        <p className="text-gray-600 mb-6">Create, manage, and grade assessments with AI-powered assistance. Track student performance and identify learning gaps.</p>
        <div className="flex space-x-4">
            <button className="flex-1 bg-brand-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors">
                <i className="fas fa-plus mr-2"></i>Create New Assessment
            </button>
            <button className="flex-1 bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors">
                <i className="fas fa-chart-pie mr-2"></i>View Performance Analytics
            </button>
        </div>
    </Card>
);

// FIX: Added a default export to resolve the module import error in App.tsx.
export default TeacherDashboard;
