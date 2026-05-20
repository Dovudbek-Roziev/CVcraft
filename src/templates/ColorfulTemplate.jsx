import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ColorfulTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#EC4899';
  const font = customization?.font || 'Nunito';

  const ACCENT_COLORS = ['#EC4899', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#111827' }}>
      {/* Rainbow header */}
      <div style={{ background: 'linear-gradient(135deg, #EC4899, #8B5CF6, #06B6D4)', padding: '28px 28px 36px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div style={{ color: 'white' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
            <p style={{ fontSize: '13px', opacity: 0.9, fontWeight: '600', marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '11px', opacity: 0.85 }}>
              {personal.email && <span>Email {personal.email}</span>}
              {personal.phone && <span>Phone {personal.phone}</span>}
              {personal.city && <span>Location {personal.city}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <ColSection title={cvLabel('about')} color="#EC4899">
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </ColSection>
          )}
          {experience?.length > 0 && (
            <ColSection title={cvLabel('shortExperience')} color="#8B5CF6">
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px', padding: '10px 12px', borderRadius: '10px', border: `2px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}30`, borderLeft: `3px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}` }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                  <p style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length], fontSize: '11px', marginBottom: '3px' }}>{exp.company} · {exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</p>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </ColSection>
          )}
          {education?.length > 0 && (
            <ColSection title={cvLabel('education')} color="#06B6D4">
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#f0f9ff', borderLeft: '3px solid #06B6D4' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                  <p style={{ color: '#06B6D4', fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</p>
                </div>
              ))}
            </ColSection>
          )}
          {projects?.length > 0 && (
            <ColSection title={cvLabel('projects')} color="#10B981">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#f0fdf4', borderLeft: '3px solid #10B981' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </ColSection>
          )}
        </div>
        <div>
          {skills?.length > 0 && (
            <ColSection title={cvLabel('skills')} color="#F59E0B">
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#f3f4f6', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, background: `linear-gradient(to right, ${ACCENT_COLORS[i % ACCENT_COLORS.length]}, ${ACCENT_COLORS[(i + 1) % ACCENT_COLORS.length]})`, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </ColSection>
          )}
          {languages?.length > 0 && (
            <ColSection title={cvLabel('languages')} color="#EC4899">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ padding: '5px 10px', borderRadius: '20px', background: `linear-gradient(to right, ${ACCENT_COLORS[i % ACCENT_COLORS.length]}15, transparent)`, border: `1px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}30`, display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{lang.name}</span>
                    <span style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </ColSection>
          )}
          {certificates?.length > 0 && (
            <ColSection title={cvLabel('certificates')} color="#8B5CF6">
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', borderRadius: '8px', backgroundColor: '#f5f3ff' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer}</div>}
                </div>
              ))}
            </ColSection>
          )}
        </div>
      </div>
    </div>
  );
}

function ColSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '20px', height: '3px', backgroundColor: color, borderRadius: '2px' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}





