import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function SkyTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#0284C7';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#0F172A', minHeight: '297mm', padding: '0' }}>
      {/* Diagonal header */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ backgroundColor: color, padding: '24px 28px 40px', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {personal.photo && (
              <img src={personal.photo} alt="photo" style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
            )}
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px', letterSpacing: '-0.3px' }}>
                {personal.firstName} {personal.lastName}
              </h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', marginBottom: '8px' }}>{personal.jobTitle}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.city && <span>{personal.city}</span>}
                {personal.linkedin && <span>{personal.linkedin}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {about && (
            <SkySection title={cvLabel('about')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </SkySection>
          )}

          {experience?.length > 0 && (
            <SkySection title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </SkySection>
          )}

          {education?.length > 0 && (
            <SkySection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${color}50` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '600' }}>{edu.school}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.field && <p style={{ fontSize: '10px', color: '#6B7280' }}>{edu.field}</p>}
                </div>
              ))}
            </SkySection>
          )}

          {projects?.length > 0 && (
            <SkySection title={cvLabel('projects')} color={color}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ padding: '8px 10px', backgroundColor: `${color}08`, borderRadius: '8px', border: `1px solid ${color}20` }}>
                    <strong style={{ fontSize: '11px', color: '#111827' }}>{proj.name}</strong>
                    {proj.tech && <p style={{ fontSize: '10px', color, marginTop: '2px', fontWeight: '600' }}>{proj.tech}</p>}
                    {proj.description && <p style={{ color: '#6B7280', fontSize: '10px', marginTop: '3px', lineHeight: '1.4' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </SkySection>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {skills?.length > 0 && (
            <SkySection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color, fontWeight: '600' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '5px', backgroundColor: `${color}15`, borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '10px' }} />
                  </div>
                </div>
              ))}
            </SkySection>
          )}

          {languages?.length > 0 && (
            <SkySection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '10px', marginBottom: '6px', padding: '4px 8px', backgroundColor: `${color}08`, borderRadius: '6px', display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                  <span style={{ fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </SkySection>
          )}

          {certificates?.length > 0 && (
            <SkySection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '7px', padding: '6px 8px', borderRadius: '6px', border: `1px solid ${color}25` }}>
                  <strong style={{ fontSize: '10px', color: '#111827', display: 'block' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ fontSize: '9px', color: '#6B7280' }}>{cert.issuer}</span>}
                </div>
              ))}
            </SkySection>
          )}
        </div>
      </div>
    </div>
  );
}

function SkySection({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${color}`, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: color, borderRadius: '50%' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}
