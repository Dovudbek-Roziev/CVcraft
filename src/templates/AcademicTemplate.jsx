import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function AcademicTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#7C2D12';
  const font = customization?.font || 'Merriweather';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1a1a1a', padding: '36px 44px', fontSize: '12px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: `2px solid ${color}` }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color, marginBottom: '6px', letterSpacing: '0.5px' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.jobTitle && <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '10px', fontStyle: 'italic' }}>{personal.jobTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '11px', color: '#6b7280' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.city && <span>{personal.city}</span>}
          {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {about && (
        <AcSection title={cvLabel('academicSummary')} color={color}>
          <p style={{ lineHeight: '1.8', color: '#374151', textAlign: 'justify' }}>{about}</p>
        </AcSection>
      )}

      {education?.length > 0 && (
        <AcSection title={cvLabel('education')} color={color}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p style={{ color, fontStyle: 'italic', marginBottom: '2px' }}>{edu.school}</p>
              {edu.field && <p style={{ color: '#6b7280', fontSize: '11px' }}>{edu.field}</p>}
            </div>
          ))}
        </AcSection>
      )}

      {experience?.length > 0 && (
        <AcSection title={cvLabel('academicExperience')} color={color}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}</span>
              </div>
              <p style={{ color, fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</p>
              {exp.description && <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{exp.description}</p>}
            </div>
          ))}
        </AcSection>
      )}

      {projects?.length > 0 && (
        <AcSection title={cvLabel('researchProjects')} color={color}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#111827' }}>{proj.name}</strong>
              {proj.link && <span style={{ color, fontSize: '11px', marginLeft: '8px' }}>{proj.link}</span>}
              {proj.description && <p style={{ color: '#4b5563', lineHeight: '1.6', marginTop: '4px' }}>{proj.description}</p>}
            </div>
          ))}
        </AcSection>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {skills?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('skills')}</h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '16px' }}>
              {skills.map((skill, i) => (
                <li key={i} style={{ fontSize: '11px', color: '#374151', marginBottom: '4px' }}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}
        {languages?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('languages')}</h2>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#374151', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{lang.name}</span>
                <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        )}
        {certificates?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('certificates')}</h2>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                {cert.issuer && <div style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}, {cert.date}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AcSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: `1px solid ${color}40`, paddingBottom: '4px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





