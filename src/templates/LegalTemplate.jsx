import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function LegalTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1C1917';
  const font = customization?.font || 'Merriweather';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1c1917', padding: '40px 48px', fontSize: '12px' }}>
      {/* Header - formal */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        {personal.photo && (
          <img src={personal.photo} alt="" style={{ width: '72px', height: '72px', borderRadius: '4px', objectFit: 'cover', margin: '0 auto 12px', border: '1px solid #d6d3d1' }} />
        )}
        <h1 style={{ fontSize: '26px', fontWeight: '700', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.jobTitle && <p style={{ fontSize: '12px', color: '#78716c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{personal.jobTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '11px', color: '#78716c', flexWrap: 'wrap' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.city && <span>{personal.city}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
        <div style={{ marginTop: '20px', borderTop: `2px solid ${color}`, borderBottom: `2px solid ${color}`, padding: '4px 0' }} />
      </div>

      {about && (
        <LegSection title={cvLabel('legalStatement')} color={color}>
          <p style={{ color: '#44403c', lineHeight: '1.8', textAlign: 'justify' }}>{about}</p>
        </LegSection>
      )}

      {experience?.length > 0 && (
        <LegSection title={cvLabel('legalExperience')} color={color}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13px', color }}>{exp.position}</strong>
                <span style={{ fontSize: '10px', color: '#78716c', fontStyle: 'italic' }}>{exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}</span>
              </div>
              <p style={{ color: '#78716c', fontStyle: 'italic', marginBottom: '4px', fontSize: '12px' }}>{exp.company}</p>
              {exp.description && <p style={{ color: '#44403c', lineHeight: '1.6' }}>{exp.description}</p>}
              {i < experience.length - 1 && <div style={{ borderBottom: '1px dotted #d6d3d1', marginTop: '12px' }} />}
            </div>
          ))}
        </LegSection>
      )}

      {education?.length > 0 && (
        <LegSection title={cvLabel('legalEducation')} color={color}>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <strong style={{ fontSize: '13px', color }}>{edu.degree}</strong>
                <p style={{ color: '#78716c', fontStyle: 'italic', fontSize: '12px' }}>{edu.school}</p>
                {edu.field && <p style={{ fontSize: '11px', color: '#a8a29e' }}>{edu.field}</p>}
              </div>
              <span style={{ fontSize: '10px', color: '#78716c', whiteSpace: 'nowrap' }}>{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </LegSection>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        {skills?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('practiceAreas')}</h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {skills.map((skill, i) => (
                <li key={i} style={{ fontSize: '11px', color: '#44403c', marginBottom: '5px', paddingLeft: '10px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color }}>{'>'}</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {languages?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('languages')}</h2>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#44403c', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{lang.name}</span>
                <span style={{ color: '#78716c', fontStyle: 'italic' }}>{lang.level}</span>
              </div>
            ))}
          </div>
        )}
        {certificates?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', borderBottom: `1px solid ${color}`, paddingBottom: '4px' }}>{cvLabel('certificates')}</h2>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color }}>{cert.name}</div>
                {cert.issuer && <div style={{ fontSize: '10px', color: '#78716c' }}>{cert.issuer} · {cert.date}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {projects?.length > 0 && (
        <LegSection title="Notable Cases & Publications" color={color}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
              <strong style={{ color, fontSize: '12px' }}>{proj.name}</strong>
              {proj.description && <p style={{ color: '#44403c', fontSize: '11px', marginTop: '3px', lineHeight: '1.5' }}>{proj.description}</p>}
            </div>
          ))}
        </LegSection>
      )}

      <div style={{ marginTop: '20px', borderTop: `2px solid ${color}` }} />
    </div>
  );
}

function LegSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '10px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', borderBottom: `1px solid ${color}40`, paddingBottom: '4px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





