
import React from 'react';
import Card from './Card';
import { Project } from '../types';

const mockProjects: Project[] = [
    { 
        id: 'p1', title: 'Build a Water Filter', description: 'Used local materials to build a functional water filter.',
        studentName: 'Your Child', submissionType: 'image',
        submissionUrl: 'https://picsum.photos/seed/filter/400/300',
        grade: 'Exceeds Expectations',
        feedback: "Excellent work! The use of charcoal and sand layers was very effective. A well-documented process."
    },
    { 
        id: 'p2', title: 'My Family Tree', description: 'Researched and drew our family lineage.',
        studentName: 'Your Child', submissionType: 'image',
        submissionUrl: 'https://picsum.photos/seed/family/400/300',
        grade: 'Meets Expectations',
        feedback: "A beautiful and creative representation of your family history."
    }
];

const ParentDashboard: React.FC = () => {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-brand-black mb-6">Parent Dashboard</h2>
            <Card className="mb-8 bg-green-50 border-l-4 border-brand-green">
                <h3 className="text-xl font-semibold text-brand-black mb-2">Weekly Progress Summary</h3>
                <p className="text-gray-700">Your child completed <strong>3 lessons</strong> in Science and achieved an average score of <strong>88%</strong> in quizzes this week. Keep up the great work!</p>
                <p className="text-sm text-gray-500 mt-4">Note: You can opt-in for SMS updates for offline access.</p>
            </Card>

            <div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-black">Project Showcase</h3>
                <p className="text-gray-600 mb-6">View your child's submitted projects and the feedback they've received.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockProjects.map(project => (
                        <Card key={project.id} className="flex flex-col">
                            <img src={project.submissionUrl} alt={project.title} className="rounded-t-lg w-full h-48 object-cover"/>
                            <div className="p-4 flex flex-col flex-grow">
                                <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                                <div className="bg-yellow-100 p-3 rounded-md mb-4">
                                    <p className="font-semibold text-yellow-800">Teacher's Feedback:</p>
                                    <p className="text-yellow-700">"{project.feedback}"</p>
                                </div>
                                <div className="bg-green-100 text-green-800 font-semibold p-3 rounded-md text-center">
                                    Grade: {project.grade}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
