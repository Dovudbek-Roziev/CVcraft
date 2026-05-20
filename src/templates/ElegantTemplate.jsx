import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ElegantTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1E3A5F';
  const font = customization?.font || 'Playfair Display';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1a1a2e' }}>
      {/* Gold top line */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, #b8960c, #d4af37, #b8960c)' }} />

      <div style={{ padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid #e8dfc3' }}>
          {personal.photo && (
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d4af37', margin: '0 auto 12px' }} />
          )}
          <h1 style={{ fontSize: '28px', fontWeight: '700', color, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            {personal.firstName} {personal.lastName}
          </h1>
          <p style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>{personal.jobTitle}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: '#6b7280' }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <span>{personal.city}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px' }}>
          <div>
            {about && (
              <ESection title={cvLabel('about')} color={color}>
                <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '12px', fontStyle: 'italic' }}>{about}</p>
              </ESection>
            )}
            {experience?.length > 0 && (
              <ESection title={cvLabel('experience')} color={color}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '13px', color, letterSpacing: '0.5px' }}>{exp.position}</strong>
                      <span style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                    </div>
                    <p style={{ color: '#d4af37', fontSize: '11px', marginBottom: '4px', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>{exp.company}</p>
                    {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.6' }}>{exp.description}</p>}
                  </div>
                ))}
              </ESection>
            )}
            {education?.length > 0 && (
              <ESection title={cvLabel('education')} color={color}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color }}>{edu.degree}</strong>
                      <span style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>{edu.startDate}-{edu.endDate}</span>
                    </div>
                    <p style={{ color: '#d4af37', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>{edu.school}</p>
                  </div>
                ))}
              </ESection>
            )}
            {projects?.length > 0 && (
              <ESection title={cvLabel('projects')} color={color}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong style={{ fontSize: '13px', color }}>{proj.name}</strong>
                    {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </ESection>
            )}
          </div>
          <div>
            {skills?.length > 0 && (
              <ESection title={cvLabel('skills')} color={color}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
                      <span style={{ color: '#374151' }}>{skill.name}</span>
                    </div>
                    <div style={{ height: '2px', backgroundColor: '#e8dfc3' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, background: 'linear-gradient(to right, #b8960c, #d4af37)' }} />
                    </div>
                  </div>
                ))}
              </ESection>
            )}
            {languages?.length > 0 && (
              <ESection title={cvLabel('languages')} color={color}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
                    <span style={{ color: '#374151' }}>{lang.name}</span>
                    <span style={{ color: '#d4af37' }}>{lang.level}</span>
                  </div>
                ))}
              </ESection>
            )}
            {certificates?.length > 0 && (
              <ESection title={cvLabel('certificates')} color={color}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #e8dfc3', fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</div>}
                  </div>
                ))}
              </ESection>
            )}
          </div>
        </div>
      </div>
      <div style={{ height: '3px', background: 'linear-gradient(to right, #b8960c, #d4af37, #b8960c)', marginTop: '8px' }} />
    </div>
  );
}

function ESection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: '700', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #d4af37, transparent)' }} />
        {title}
        <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, #d4af37, transparent)' }} />
      </h2>
      {children}
    </div>
  );
}





