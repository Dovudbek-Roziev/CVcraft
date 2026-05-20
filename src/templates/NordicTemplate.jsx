import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function NordicTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#111827';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, padding: '40px 44px', color: '#111827' }}>
      {/* Header - very minimal */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {personal.photo && (
              <img src={personal.photo} alt="photo" style={{ width: '64px', height: '64px', borderRadius: '4px', objectFit: 'cover', filter: 'grayscale(20%)' }} />
            )}
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '-1px', color: '#111827', marginBottom: '4px' }}>
                {personal.firstName} <strong style={{ fontWeight: '700' }}>{personal.lastName}</strong>
              </h1>
              <p style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '2px', textTransform: 'uppercase' }}>{personal.jobTitle}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#9CA3AF', lineHeight: '2' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: '#111827', marginTop: '20px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '40px' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {about && (
            <Section title={cvLabel('about')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '12px', fontWeight: '300' }}>{about}</p>
            </Section>
          )}

          {experience?.length > 0 && (
            <Section title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.5px' }}>
                      {exp.startDate} — {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px', letterSpacing: '0.3px' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '6px', lineHeight: '1.6', fontWeight: '300' }}>{exp.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {education?.length > 0 && (
            <Section title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{edu.degree}</strong>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{edu.school}</p>
                  {edu.field && <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{edu.field}</p>}
                </div>
              ))}
            </Section>
          )}

          {projects?.length > 0 && (
            <Section title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '12px', color: '#111827' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ fontSize: '10px', color: '#9CA3AF', marginLeft: '6px' }}>{proj.tech}</span>}
                  {proj.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '3px', lineHeight: '1.5', fontWeight: '300' }}>{proj.description}</p>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {skills?.length > 0 && (
            <Section title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9CA3AF', fontSize: '10px' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '2px', backgroundColor: '#E5E7EB' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: '#111827' }} />
                  </div>
                </div>
              ))}
            </Section>
          )}

          {languages?.length > 0 && (
            <Section title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#374151', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{lang.name}</span>
                  <span style={{ color: '#9CA3AF', fontSize: '10px' }}>{lang.level}</span>
                </div>
              ))}
            </Section>
          )}

          {certificates?.length > 0 && (
            <Section title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <strong style={{ fontSize: '11px', color: '#111827', display: 'block' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{cert.issuer}</span>}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9CA3AF', marginBottom: '12px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
