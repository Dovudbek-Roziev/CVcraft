import { useCVContext } from '../context/CVContext.jsx';

// Convenience hook with action helpers
export function useCV() {
  const { cvData, dispatch } = useCVContext();

  return {
    cvData,
    dispatch,
    updatePersonal: (data) => dispatch({ type: 'UPDATE_PERSONAL', payload: data }),
    updateAbout: (text) => dispatch({ type: 'UPDATE_ABOUT', payload: text }),
    addExperience: () => dispatch({ type: 'ADD_EXPERIENCE' }),
    updateExperience: (data) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: data }),
    removeExperience: (id) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id }),
    addEducation: () => dispatch({ type: 'ADD_EDUCATION' }),
    updateEducation: (data) => dispatch({ type: 'UPDATE_EDUCATION', payload: data }),
    removeEducation: (id) => dispatch({ type: 'REMOVE_EDUCATION', payload: id }),
    addSkill: () => dispatch({ type: 'ADD_SKILL' }),
    updateSkill: (data) => dispatch({ type: 'UPDATE_SKILL', payload: data }),
    removeSkill: (id) => dispatch({ type: 'REMOVE_SKILL', payload: id }),
    addLanguage: () => dispatch({ type: 'ADD_LANGUAGE' }),
    updateLanguage: (data) => dispatch({ type: 'UPDATE_LANGUAGE', payload: data }),
    removeLanguage: (id) => dispatch({ type: 'REMOVE_LANGUAGE', payload: id }),
    addProject: () => dispatch({ type: 'ADD_PROJECT' }),
    updateProject: (data) => dispatch({ type: 'UPDATE_PROJECT', payload: data }),
    removeProject: (id) => dispatch({ type: 'REMOVE_PROJECT', payload: id }),
    addCertificate: () => dispatch({ type: 'ADD_CERTIFICATE' }),
    updateCertificate: (data) => dispatch({ type: 'UPDATE_CERTIFICATE', payload: data }),
    removeCertificate: (id) => dispatch({ type: 'REMOVE_CERTIFICATE', payload: id }),
    updateCustomization: (data) => dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: data }),
    reorderSections: (sections) => dispatch({ type: 'REORDER_SECTIONS', payload: sections }),
    resetCV: () => dispatch({ type: 'RESET_CV' }),
  };
}
