import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function StripeTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#2563EB';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#111827', minHeight: '297mm' }}>
      {/* Header stripe */}
      <div style={{ backgroundColor: color, padding: '24px 28px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {personal.photo && (
            <img src={personal.photo} alt="photo" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px', letterSpacing: '-0.3px' }}>
              {personal.firstName} {personal.lastName}
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>{personal.jobTitle}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.9' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}{personal.country ? ', ' + personal.country : ''}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </div>

      {/* Sub-stripe */}
      <div style={{ backgroundColor: `${color}18`, padding: '6px 28px', display: 'flex', gap: '20px' }}>
        {personal.website && <span style={{ fontSize: '10px', color: `${color}CC` }}>{personal.website}</span>}
        {personal.github && <span style={{ fontSize: '10px', color: `${color}CC` }}>{personal.github}</span>}
        {personal.telegram && <span style={{ fontSize: '10px', color: `${color}CC` }}>{personal.telegram}</span>}
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', padding: '20px 28px', gap: '24px' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {about && (
            <StripeSection title={cvLabel('about')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </StripeSection>
          )}

          {experience?.length > 0 && (
            <StripeSection title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                      <span style={{ fontSize: '11px', color, marginLeft: '6px', fontWeight: '600' }}>{exp.company}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '8px', padding: '1px 6px', backgroundColor: `${color}12`, borderRadius: '4px' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </StripeSection>
          )}

          {education?.length > 0 && (
            <StripeSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                      <span style={{ fontSize: '11px', color, marginLeft: '6px', fontWeight: '600' }}>{edu.school}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', padding: '1px 6px', backgroundColor: `${color}12`, borderRadius: '4px' }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {edu.field && <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{edu.field}</p>}
                </div>
              ))}
            </StripeSection>
          )}

          {projects?.length > 0 && (
            <StripeSection title={cvLabel('projects')} color={color}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ padding: '8px 10px', backgroundColor: `${color}08`, borderRadius: '6px', borderLeft: `3px solid ${color}` }}>
                    <strong style={{ fontSize: '11px', color: '#111827' }}>{proj.name}</strong>
                    {proj.tech && <p style={{ fontSize: '10px', color, marginTop: '2px', fontWeight: '600' }}>{proj.tech}</p>}
                    {proj.description && <p style={{ color: '#6B7280', fontSize: '10px', marginTop: '3px', lineHeight: '1.4' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </StripeSection>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {skills?.length > 0 && (
            <StripeSection title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color, fontWeight: '600' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </StripeSection>
          )}

          {languages?.length > 0 && (
            <StripeSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px', padding: '3px 6px', backgroundColor: i % 2 === 0 ? `${color}08` : 'transparent', borderRadius: '3px' }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </StripeSection>
          )}

          {certificates?.length > 0 && (
            <StripeSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '7px', paddingBottom: '7px', borderBottom: i < certificates.length - 1 ? `1px solid ${color}18` : 'none' }}>
                  <strong style={{ fontSize: '10px', color: '#111827', display: 'block' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ fontSize: '10px', color: '#6B7280' }}>{cert.issuer}</span>}
                  {cert.date && <span style={{ fontSize: '10px', color: '#9CA3AF' }}> · {cert.date}</span>}
                </div>
              ))}
            </StripeSection>
          )}
        </div>
      </div>
    </div>
  );
}

function StripeSection({ title, color, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '3px', height: '14px', backgroundColor: color, borderRadius: '2px' }} />
        <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
