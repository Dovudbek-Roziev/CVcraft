import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function MedicalTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#0E7490';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Header */}
      <div style={{ backgroundColor: color, padding: '28px 32px', color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
        {personal.photo ? (
          <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
            вљ•
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
          <p style={{ fontSize: '13px', opacity: 0.85, marginBottom: '8px' }}>{personal.jobTitle}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', opacity: 0.85, flexWrap: 'wrap' }}>
            {personal.email && <span>Email {personal.email}</span>}
            {personal.phone && <span>Phone {personal.phone}</span>}
            {personal.city && <span>Location {personal.city}</span>}
          </div>
        </div>
        {/* Medical cross */}
        <div style={{ fontSize: '40px', opacity: 0.3 }}>вљ•пёЏ</div>
      </div>

      {/* White strip */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #0e7490, #06b6d4, #0e7490)' }} />

      <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <MedSection title={cvLabel('professionalSummary')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </MedSection>
          )}
          {experience?.length > 0 && (
            <MedSection title={cvLabel('clinicalExperience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px', padding: '10px 12px', backgroundColor: '#f0f9ff', borderRadius: '8px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9ca3af', backgroundColor: 'white', padding: '2px 8px', borderRadius: '10px' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                  </div>
                  <p style={{ color, fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#4b5563', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </MedSection>
          )}
          {education?.length > 0 && (
            <MedSection title={cvLabel('medicalEducation')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '12px' }}>{edu.school}</p>
                    {edu.field && <p style={{ fontSize: '11px', color: '#6b7280' }}>{edu.field}</p>}
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate}-{edu.endDate}</span>
                </div>
              ))}
            </MedSection>
          )}
          {projects?.length > 0 && (
            <MedSection title={cvLabel('researchPublications')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </MedSection>
          )}
        </div>
        <div>
          {skills?.length > 0 && (
            <MedSection title={cvLabel('clinicalSkills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e0f2fe', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </MedSection>
          )}
          {languages?.length > 0 && (
            <MedSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </MedSection>
          )}
          {certificates?.length > 0 && (
            <MedSection title={cvLabel('licenses')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: `1px solid ${color}20` }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </MedSection>
          )}
        </div>
      </div>
    </div>
  );
}

function MedSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${color}` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





