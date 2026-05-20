import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Default empty CV data structure
const defaultCVData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    photo: null,
    linkedin: '',
    github: '',
    telegram: '',
    website: '',
  },
  about: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certificates: [],
  customization: {
    template: 'classic',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    textColor: '#1F2937',
    backgroundColor: '#FFFFFF',
    accentColor: '#10B981',
    font: 'Inter',
    layout: '2-column',
    sections: ['personal', 'about', 'experience', 'education', 'skills', 'languages', 'projects', 'certificates'],
    showPhoto: true,
    skillBarStyle: 'linear',
    fontSize: 'medium',
  },
};

// Reducer for state management
function cvReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } };
    case 'UPDATE_ABOUT':
      return { ...state, about: action.payload };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, { id: Date.now(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp => exp.id === action.payload.id ? { ...exp, ...action.payload } : exp),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter(exp => exp.id !== action.payload) };
    case 'REORDER_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, { id: Date.now(), school: '', degree: '', field: '', startDate: '', endDate: '', current: false, description: '' }],
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu => edu.id === action.payload.id ? { ...edu, ...action.payload } : edu),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter(edu => edu.id !== action.payload) };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, { id: Date.now(), name: '', level: 80 }],
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill => skill.id === action.payload.id ? { ...skill, ...action.payload } : skill),
      };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter(skill => skill.id !== action.payload) };
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, { id: Date.now(), name: '', level: 'B1' }],
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map(lang => lang.id === action.payload.id ? { ...lang, ...action.payload } : lang),
      };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter(lang => lang.id !== action.payload) };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { id: Date.now(), name: '', description: '', link: '', tech: '' }],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(proj => proj.id === action.payload.id ? { ...proj, ...action.payload } : proj),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter(proj => proj.id !== action.payload) };
    case 'ADD_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, { id: Date.now(), name: '', issuer: '', date: '', link: '' }],
      };
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map(cert => cert.id === action.payload.id ? { ...cert, ...action.payload } : cert),
      };
    case 'REMOVE_CERTIFICATE':
      return { ...state, certificates: state.certificates.filter(cert => cert.id !== action.payload) };
    case 'UPDATE_CUSTOMIZATION':
      return { ...state, customization: { ...state.customization, ...action.payload } };
    case 'REORDER_SECTIONS':
      return { ...state, customization: { ...state.customization, sections: action.payload } };
    case 'LOAD_CV':
      return action.payload;
    case 'RESET_CV':
      return defaultCVData;
    default:
      return state;
  }
}

const CVContext = createContext(null);

export function CVProvider({ children }) {
  const [cvData, dispatch] = useReducer(cvReducer, defaultCVData, () => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem('cvcraft_data');
      return saved ? JSON.parse(saved) : defaultCVData;
    } catch {
      return defaultCVData;
    }
  });

  // Auto-save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('cvcraft_data', JSON.stringify(cvData));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [cvData]);

  return (
    <CVContext.Provider value={{ cvData, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCVContext must be used inside CVProvider');
  return ctx;
}

export { defaultCVData };
