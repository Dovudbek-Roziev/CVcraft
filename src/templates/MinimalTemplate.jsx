import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function MinimalTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#6B7280';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, padding: '40px', color: '#1f2937' }}>
      {/* Name only, clean */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '2px', color: '#111827', marginBottom: '4px' }}>
          {personal.firstName?.toUpperCase()} <strong style={{ fontWeight: '700' }}>{personal.lastName?.toUpperCase()}</strong>
        </h1>
        <p style={{ fontSize: '13px', color, letterSpacing: '1px' }}>{personal.jobTitle}</p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap', fontSize: '11px', color: '#9ca3af' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.city && <span>{personal.city}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
        <div style={{ marginTop: '16px', height: '1px', backgroundColor: '#e5e7eb' }} />
      </div>

      {about && (
        <MinSection title={cvLabel('about').toUpperCase()}>
          <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
        </MinSection>
      )}

      {experience?.length > 0 && (
        <MinSection title={cvLabel('shortExperience').toUpperCase()}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#111827' }}>{exp.position}</span>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '12px', color, marginBottom: '4px' }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.5' }}>{exp.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {education?.length > 0 && (
        <MinSection title={cvLabel('education').toUpperCase()}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#111827' }}>{edu.degree}</span>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p style={{ fontSize: '12px', color }}>{edu.school}</p>
            </div>
          ))}
        </MinSection>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {skills?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', color: '#9ca3af', marginBottom: '12px' }}>{cvLabel('skills').toUpperCase()}</h3>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#374151', flex: 1 }}>{skill.name}</span>
                <div style={{ width: '80px', height: '2px', backgroundColor: '#e5e7eb', borderRadius: '1px' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '1px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {languages?.length > 0 && (
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', color: '#9ca3af', marginBottom: '12px' }}>{cvLabel('languages').toUpperCase()}</h3>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{lang.name}</span>
                <span style={{ color: '#9ca3af' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {projects?.length > 0 && (
        <MinSection title={cvLabel('projects').toUpperCase()}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <span style={{ fontWeight: '600', fontSize: '13px', color: '#111827' }}>{proj.name}</span>
              {proj.description && <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '3px' }}>{proj.description}</p>}
            </div>
          ))}
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', color: '#9ca3af', marginBottom: '12px' }}>{title}</h2>
      {children}
    </div>
  );
}





