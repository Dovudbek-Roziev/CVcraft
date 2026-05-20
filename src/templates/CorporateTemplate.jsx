import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function CorporateTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1E3A5F';
  const font = customization?.font || 'Inter';
  const lightBg = '#F0F4F8';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1E293B', minHeight: '297mm' }}>
      {/* Top header */}
      <div style={{ backgroundColor: color, padding: '0' }}>
        <div style={{ display: 'flex' }}>
          {personal.photo && (
            <div style={{ width: '100px', flexShrink: 0, overflow: 'hidden' }}>
              <img src={personal.photo} alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '100px' }} />
            </div>
          )}
          <div style={{ flex: 1, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px', letterSpacing: '-0.3px' }}>
                {personal.firstName} {personal.lastName}
              </h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '500', letterSpacing: '0.5px' }}>{personal.jobTitle}</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.9' }}>
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.city && <div>{personal.city}{personal.country ? ', ' + personal.country : ''}</div>}
            </div>
          </div>
        </div>
        {/* Nav-like bar */}
        <div style={{ backgroundColor: `${color}DD`, padding: '6px 24px', display: 'flex', gap: '20px' }}>
          {personal.linkedin && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>in: {personal.linkedin}</span>}
          {personal.website && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>web: {personal.website}</span>}
          {personal.github && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>git: {personal.github}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: '0' }}>
        {/* Main */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {about && (
            <CorpSection title={cvLabel('about')} color={color} lightBg={lightBg}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </CorpSection>
          )}

          {experience?.length > 0 && (
            <CorpSection title={cvLabel('experience')} color={color} lightBg={lightBg}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: i < experience.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '8px', backgroundColor: lightBg, padding: '2px 6px', borderRadius: '3px' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '5px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </CorpSection>
          )}

          {education?.length > 0 && (
            <CorpSection title={cvLabel('education')} color={color} lightBg={lightBg}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '600' }}>{edu.school}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', backgroundColor: lightBg, padding: '2px 6px', borderRadius: '3px' }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {edu.field && <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{edu.field}</p>}
                </div>
              ))}
            </CorpSection>
          )}

          {projects?.length > 0 && (
            <CorpSection title={cvLabel('projects')} color={color} lightBg={lightBg}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '8px 10px', backgroundColor: lightBg, borderRadius: '4px', borderLeft: `3px solid ${color}` }}>
                  <strong style={{ fontSize: '11px', color: '#111827' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ fontSize: '10px', color, marginLeft: '6px', fontWeight: '600' }}>{proj.tech}</span>}
                  {proj.description && <p style={{ color: '#4B5563', fontSize: '10px', marginTop: '3px', lineHeight: '1.4' }}>{proj.description}</p>}
                </div>
              ))}
            </CorpSection>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ backgroundColor: lightBg, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: `2px solid ${color}20` }}>
          {skills?.length > 0 && (
            <SideSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#CBD5E1', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </SideSection>
          )}

          {languages?.length > 0 && (
            <SideSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px', color: '#374151' }}>
                  <span style={{ fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </SideSection>
          )}

          {certificates?.length > 0 && (
            <SideSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', backgroundColor: 'white', padding: '6px 8px', borderRadius: '4px', border: `1px solid ${color}20` }}>
                  <strong style={{ fontSize: '10px', color: '#111827', display: 'block' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ fontSize: '9px', color: '#6B7280' }}>{cert.issuer}</span>}
                  {cert.date && <span style={{ fontSize: '9px', color: '#9CA3AF' }}> · {cert.date}</span>}
                </div>
              ))}
            </SideSection>
          )}
        </div>
      </div>
    </div>
  );
}

function CorpSection({ title, color, lightBg, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${color}` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function SideSection({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '9px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${color}40` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
