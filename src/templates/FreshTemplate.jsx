import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function FreshTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#059669';
  const font = customization?.font || 'Nunito';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Curved header */}
      <div style={{ background: `linear-gradient(135deg, ${color}, #10b981)`, padding: '32px 32px 48px', position: 'relative', marginBottom: '-20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)' }} />
          ) : (
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div style={{ color: 'white' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
            <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', opacity: 0.85 }}>
              {personal.email && <span>Email {personal.email}</span>}
              {personal.phone && <span>Phone {personal.phone}</span>}
              {personal.city && <span>Location {personal.city}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Wave shape */}
      <div style={{ height: '20px', background: 'white', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', position: 'relative', zIndex: 1 }} />

      <div style={{ padding: '8px 32px 24px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <FSection title={cvLabel('about')} color={color}>
              <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </FSection>
          )}
          {experience?.length > 0 && (
            <FSection title={cvLabel('shortExperience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '10px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, marginTop: '3px', flexShrink: 0 }} />
                    {i < experience.length - 1 && <div style={{ flex: 1, width: '2px', backgroundColor: color + '30', marginTop: '4px' }} />}
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                    <p style={{ color, fontSize: '12px', marginBottom: '3px' }}>{exp.company} · {exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</p>
                    {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </FSection>
          )}
          {education?.length > 0 && (
            <FSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</p>
                  </div>
                </div>
              ))}
            </FSection>
          )}
          {projects?.length > 0 && (
            <FSection title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </FSection>
          )}
        </div>

        <div>
          {skills?.length > 0 && (
            <FSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#d1fae5', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </FSection>
          )}
          {languages?.length > 0 && (
            <FSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '600', color: '#374151' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </FSection>
          )}
          {certificates?.length > 0 && (
            <FSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: '#f0fdf4', borderRadius: '8px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}</div>}
                </div>
              ))}
            </FSection>
          )}
        </div>
      </div>
    </div>
  );
}

function FSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '16px', height: '3px', backgroundColor: color, borderRadius: '2px', display: 'inline-block' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}





