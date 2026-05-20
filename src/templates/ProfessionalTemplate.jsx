import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ProfessionalTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1E40AF';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Header with two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: color }}>
        <div style={{ padding: '28px 24px 28px 32px', color: 'white' }}>
          {personal.photo && (
            <img src={personal.photo} alt="" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover', marginBottom: '12px', border: '2px solid rgba(255,255,255,0.4)' }} />
          )}
          <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{personal.firstName}<br />{personal.lastName}</h1>
          <p style={{ fontSize: '13px', opacity: 0.85, fontWeight: '500' }}>{personal.jobTitle}</p>
        </div>
        <div style={{ padding: '28px 32px 28px 16px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
          <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.6, marginBottom: '10px' }}>{cvLabel('contact')}</h3>
          {personal.email && <div style={{ fontSize: '11px', marginBottom: '6px' }}>Email {personal.email}</div>}
          {personal.phone && <div style={{ fontSize: '11px', marginBottom: '6px' }}>Phone {personal.phone}</div>}
          {personal.city && <div style={{ fontSize: '11px', marginBottom: '6px' }}>Location {personal.city}</div>}
          {personal.linkedin && <div style={{ fontSize: '11px', marginBottom: '6px' }}>in {personal.linkedin}</div>}
          {personal.website && <div style={{ fontSize: '11px' }}>Web {personal.website}</div>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '0' }}>
        {/* Main */}
        <div style={{ padding: '24px 20px 24px 32px', borderRight: '1px solid #f1f5f9' }}>
          {about && (
            <PSection title={cvLabel('about')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </PSection>
          )}
          {experience?.length > 0 && (
            <PSection title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                      <p style={{ color, fontSize: '12px', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', padding: '2px 8px', borderRadius: '10px', whiteSpace: 'nowrap' }}>
                      {exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </PSection>
          )}
          {education?.length > 0 && (
            <PSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '12px' }}>{edu.school}</p>
                    {edu.field && <p style={{ fontSize: '11px', color: '#6b7280' }}>{edu.field}</p>}
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate}-{edu.endDate}</span>
                </div>
              ))}
            </PSection>
          )}
          {projects?.length > 0 && (
            <PSection title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </PSection>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '24px 24px 24px 16px', backgroundColor: '#f8fafc' }}>
          {skills?.length > 0 && (
            <PSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </PSection>
          )}
          {languages?.length > 0 && (
            <PSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </PSection>
          )}
          {certificates?.length > 0 && (
            <PSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.date}</div>}
                </div>
              ))}
            </PSection>
          )}
        </div>
      </div>
    </div>
  );
}

function PSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${color}20` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





