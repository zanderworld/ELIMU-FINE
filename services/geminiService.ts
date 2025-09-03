
import { Lesson, QuizQuestion } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

// This is a mock service. In a real application, you would implement actual API calls.
// However, the structure is designed to be compatible with the real Gemini API.

const MOCK_API_DELAY = 1500;

// Since we cannot use a real API key in this environment, we will mock the service.
// If a key were available, the setup would be:
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateMockLesson = (topic: string): Lesson => ({
  id: `lesson-${Date.now()}`,
  title: `Introduction to ${topic}`,
  strand: "Science and Technology",
  subStrand: "Living Things",
  content: `This lesson explores the fascinating world of ${topic}. We will learn about their characteristics, habitats, and importance in our ecosystem. One key aspect is understanding the difference between various species and how they adapt to their environment. Critical thinking and observation are key competencies you will develop.`,
  visualAidUrl: 'https://picsum.photos/600/400',
  quiz: [
    {
      question: `What is a primary characteristic of ${topic}?`,
      options: ['Characteristic A', 'Characteristic B', 'Characteristic C', 'Characteristic D'],
      correctAnswer: 'Characteristic A',
      type: 'mcq',
    },
    {
      question: `True or False: All ${topic} live in the same environment.`,
      options: ['True', 'False'],
      correctAnswer: 'False',
      type: 'true_false',
    },
  ],
});

export const geminiService = {
  generateLesson: async (topic: string, grade: string): Promise<Lesson> => {
    console.log(`Generating lesson for topic: ${topic}, Grade: ${grade}`);
    
    // In a real implementation:
    /*
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: `Generate a CBC-aligned lesson for a Grade ${grade} student in Kenya on the topic "${topic}". The lesson should include a title, strand, sub-strand, a short content paragraph (around 100 words), and a 2-question quiz (one multiple choice, one true/false).`,
       config: {
         responseMimeType: "application/json",
         responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              strand: { type: Type.STRING },
              subStrand: { type: Type.STRING },
              content: { type: Type.STRING },
              quiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                    type: { type: Type.STRING },
                  }
                }
              }
            }
          }
       },
    });
    const lessonData = JSON.parse(response.text);
    return { id: `lesson-${Date.now()}`, ...lessonData, visualAidUrl: 'https://picsum.photos/600/400' };
    */

    // Mock implementation:
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockLesson(topic));
      }, MOCK_API_DELAY);
    });
  },

  generateCertificateText: async (studentName: string, achievement: string): Promise<string> => {
    console.log(`Generating certificate for ${studentName} for ${achievement}`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`This certificate is proudly awarded to ${studentName} for outstanding achievement in the "${achievement}". Your dedication and creativity are an inspiration to all. Well done!`);
      }, 500);
    });
  },
};
