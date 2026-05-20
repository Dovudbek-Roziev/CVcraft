import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function BoldTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#DC2626';
  const font = customization?.font || 'Montserrat';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#111827' }}>
      {/* Bold header */}
      <div style={{ backgroundColor: '#111827', padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '120px', height: '120px', backgroundColor: color, borderRadius: '50%', opacity: 0.3 }} />
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover', border: `3px solid ${color}` }} />
          ) : (
            <div style={{ width: '80px', height: '80px', borderRadius: '4px', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900', color: 'white', flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              {personal.firstName} {personal.lastName}
            </h1>
            <p style={{ color, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{personal.jobTitle}</p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: '11px', color: '#9ca3af' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div style={{ marginTop: '4px' }}>{personal.phone}</div>}
            {personal.city && <div style={{ marginTop: '4px' }}>{personal.city}</div>}
          </div>
        </div>
      </div>

      {/* Red stripe */}
      <div style={{ height: '4px', backgroundColor: color }} />

      <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <BoldSection title={cvLabel('about')} color={color}>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '12px' }}>{about}</p>
            </BoldSection>
          )}
          {experience?.length > 0 && (
            <BoldSection title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                  </div>
                  <p style={{ color, fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </BoldSection>
          )}
          {education?.length > 0 && (
            <BoldSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                  <p style={{ color, fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</p>
                </div>
              ))}
            </BoldSection>
          )}
          {projects?.length > 0 && (
            <BoldSection title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </BoldSection>
          )}
        </div>

        <div>
          {skills?.length > 0 && (
            <BoldSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '3px' }}>
                    <span style={{ color: '#111827' }}>{skill.name}</span>
                    <span style={{ color }}>{'в–€'.repeat(Math.round(skill.level / 20))}{'в–‘'.repeat(5 - Math.round(skill.level / 20))}</span>
                  </div>
                </div>
              ))}
            </BoldSection>
          )}
          {languages?.length > 0 && (
            <BoldSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', fontWeight: '600' }}>
                  <span style={{ color: '#111827' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </BoldSection>
          )}
          {certificates?.length > 0 && (
            <BoldSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', borderLeft: `3px solid ${color}`, paddingLeft: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}</div>}
                </div>
              ))}
            </BoldSection>
          )}
        </div>
      </div>
    </div>
  );
}

function BoldSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', width: '4px', height: '14px', backgroundColor: color }} />
        {title}
      </h2>
      {children}
    </div>
  );
}





