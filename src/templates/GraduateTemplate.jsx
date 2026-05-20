import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function GraduateTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#6D28D9';
  const font = customization?.font || 'Poppins';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg, ${color} 0%, ${color}cc 100%)`, padding: '28px 28px 40px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '120px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
            <p style={{ fontSize: '13px', opacity: 0.85, marginBottom: '10px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', opacity: 0.8 }}>
              {personal.email && <span>Email {personal.email}</span>}
              {personal.phone && <span>Phone {personal.phone}</span>}
              {personal.city && <span>Location {personal.city}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Curved white area */}
      <div style={{ height: '16px', backgroundColor: 'white', borderRadius: '50% 50% 0 0 / 100%', marginTop: '-16px', position: 'relative', zIndex: 1 }} />

      <div style={{ padding: '8px 28px 24px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <GSection title={cvLabel('about')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </GSection>
          )}
          {education?.length > 0 && (
            <GSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '14px', padding: '10px 12px', backgroundColor: color + '08', borderRadius: '10px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>{edu.startDate}-{edu.endDate}</span>
                  </div>
                  <p style={{ color, fontSize: '12px', fontWeight: '500' }}>{edu.school}</p>
                  {edu.field && <p style={{ fontSize: '11px', color: '#6b7280' }}>{edu.field}</p>}
                </div>
              ))}
            </GSection>
          )}
          {experience?.length > 0 && (
            <GSection title={cvLabel('shortExperience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                  </div>
                  <p style={{ color, fontSize: '11px', marginBottom: '3px' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </GSection>
          )}
          {projects?.length > 0 && (
            <GSection title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 10px', backgroundColor: color + '08', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '12px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </GSection>
          )}
        </div>
        <div>
          {skills?.length > 0 && (
            <GSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: color + '20', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </GSection>
          )}
          {languages?.length > 0 && (
            <GSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: color + '10', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '600', color: '#374151' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </GSection>
          )}
          {certificates?.length > 0 && (
            <GSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: color + '08', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer}</div>}
                </div>
              ))}
            </GSection>
          )}
        </div>
      </div>
    </div>
  );
}

function GSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: color + '20', border: `1.5px solid ${color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}





