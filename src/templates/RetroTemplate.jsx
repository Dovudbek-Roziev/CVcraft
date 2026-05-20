import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function RetroTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#92400E';
  const font = customization?.font || 'Georgia, serif';
  const bg = '#FFFBF5';
  const borderColor = `${color}40`;

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: bg, padding: '32px 36px', color: '#292524', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: `3px double ${color}` }}>
        {personal.photo && (
          <img src={personal.photo} alt="photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${color}`, marginBottom: '10px' }} />
        )}
        <h1 style={{ fontSize: '26px', fontWeight: '700', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
          {personal.firstName} {personal.lastName}
        </h1>
        <p style={{ fontSize: '13px', color: '#78716C', fontStyle: 'italic', marginBottom: '10px' }}>{personal.jobTitle}</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: '#78716C' }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☎ {personal.phone}</span>}
          {personal.city && <span>◉ {personal.city}{personal.country ? ', ' + personal.country : ''}</span>}
          {personal.linkedin && <span>❏ {personal.linkedin}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px' }}>
        {/* Main content */}
        <div>
          {about && (
            <RetroSection title={cvLabel('about')} color={color} borderColor={borderColor}>
              <p style={{ color: '#44403C', lineHeight: '1.8', fontSize: '12px', fontStyle: 'italic' }}>{about}</p>
            </RetroSection>
          )}

          {experience?.length > 0 && (
            <RetroSection title={cvLabel('experience')} color={color} borderColor={borderColor}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: i < experience.length - 1 ? `1px dashed ${borderColor}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', color, fontStyle: 'italic' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#A8A29E', fontStyle: 'italic' }}>
                      {exp.startDate} — {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#78716C', margin: '2px 0 4px' }}>⟶ {exp.company}</p>
                  {exp.description && <p style={{ color: '#57534E', fontSize: '11px', lineHeight: '1.6' }}>{exp.description}</p>}
                </div>
              ))}
            </RetroSection>
          )}

          {education?.length > 0 && (
            <RetroSection title={cvLabel('education')} color={color} borderColor={borderColor}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '12px', color, fontStyle: 'italic' }}>{edu.degree}</strong>
                    <span style={{ fontSize: '10px', color: '#A8A29E', fontStyle: 'italic' }}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#78716C', marginTop: '2px' }}>⟶ {edu.school}</p>
                  {edu.field && <p style={{ fontSize: '10px', color: '#A8A29E' }}>{edu.field}</p>}
                </div>
              ))}
            </RetroSection>
          )}

          {projects?.length > 0 && (
            <RetroSection title={cvLabel('projects')} color={color} borderColor={borderColor}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '12px', color, fontStyle: 'italic' }}>❧ {proj.name}</strong>
                  {proj.description && <p style={{ color: '#57534E', fontSize: '11px', marginTop: '3px', lineHeight: '1.5' }}>{proj.description}</p>}
                </div>
              ))}
            </RetroSection>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {skills?.length > 0 && (
            <RetroSection title={cvLabel('skills')} color={color} borderColor={borderColor}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px', color: '#44403C' }}>
                    <span>{skill.name}</span>
                    <span style={{ color, fontSize: '10px' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#E7E5E4', borderRadius: '0' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </RetroSection>
          )}

          {languages?.length > 0 && (
            <RetroSection title={cvLabel('languages')} color={color} borderColor={borderColor}>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#44403C', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '700', color }}>{lang.name}</span>
                  <span style={{ color: '#78716C', fontStyle: 'italic' }}> — {lang.level}</span>
                </div>
              ))}
            </RetroSection>
          )}

          {certificates?.length > 0 && (
            <RetroSection title={cvLabel('certificates')} color={color} borderColor={borderColor}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '7px', fontSize: '11px' }}>
                  <strong style={{ color, fontStyle: 'italic' }}>{cert.name}</strong>
                  {cert.issuer && <p style={{ color: '#78716C', fontSize: '10px' }}>{cert.issuer}</p>}
                  {cert.date && <p style={{ color: '#A8A29E', fontSize: '10px', fontStyle: 'italic' }}>{cert.date}</p>}
                </div>
              ))}
            </RetroSection>
          )}
        </div>
      </div>
    </div>
  );
}

function RetroSection({ title, color, borderColor, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color, marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
        ✦ {title}
      </h2>
      {children}
    </div>
  );
}
