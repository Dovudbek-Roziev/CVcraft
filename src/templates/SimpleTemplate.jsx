import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function SimpleTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#9CA3AF';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, padding: '32px', color: '#374151', fontSize: '12px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        {personal.photo && (
          <img src={personal.photo} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px' }} />
        )}
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>{personal.firstName} {personal.lastName}</h1>
        <p style={{ color, marginTop: '2px' }}>{personal.jobTitle}</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '8px', fontSize: '11px', color: '#6b7280' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.city && <span>{personal.city}</span>}
        </div>
        <hr style={{ marginTop: '16px', borderColor: '#e5e7eb' }} />
      </div>

      {about && <SimpleSection title={cvLabel('about')} color={color}><p style={{ lineHeight: '1.6' }}>{about}</p></SimpleSection>}

      {experience?.length > 0 && (
        <SimpleSection title={cvLabel('experience')} color={color}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', color: '#111827' }}>{exp.position} - {exp.company}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}</div>
              {exp.description && <p style={{ color: '#6b7280', lineHeight: '1.5' }}>{exp.description}</p>}
            </div>
          ))}
        </SimpleSection>
      )}

      {education?.length > 0 && (
        <SimpleSection title={cvLabel('education')} color={color}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: '600', color: '#111827' }}>{edu.degree} - {edu.school}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </SimpleSection>
      )}

      <div style={{ display: 'flex', gap: '24px' }}>
        {skills?.length > 0 && (
          <SimpleSection title={cvLabel('skills')} color={color} style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ padding: '3px 10px', backgroundColor: '#f3f4f6', borderRadius: '20px', fontSize: '11px', color: '#374151' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </SimpleSection>
        )}
        {languages?.length > 0 && (
          <SimpleSection title={cvLabel('languages')} color={color} style={{ flex: 1 }}>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '12px', marginBottom: '4px' }}>{lang.name} - {lang.level}</div>
            ))}
          </SimpleSection>
        )}
      </div>

      {projects?.length > 0 && (
        <SimpleSection title={cvLabel('projects')} color={color}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#111827' }}>{proj.name}</span>
              {proj.description && <p style={{ color: '#6b7280' }}>{proj.description}</p>}
            </div>
          ))}
        </SimpleSection>
      )}
    </div>
  );
}

function SimpleSection({ title, color, children, style }) {
  return (
    <div style={{ marginBottom: '18px', ...style }}>
      <h2 style={{ fontSize: '13px', fontWeight: '700', color, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid #e5e7eb` }}>{title}</h2>
      {children}
    </div>
  );
}





