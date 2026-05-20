import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';
import SkillBar from '../components/SkillBar.jsx';

export default function ClassicTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#374151';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, fontSize: '13px', color: '#1f2937' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${color}`, paddingBottom: '16px', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {personal.photo && (
          <img src={personal.photo} alt="photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${color}` }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color, marginBottom: '4px' }}>
            {personal.firstName} {personal.lastName}
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{personal.jobTitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '11px', color: '#6b7280' }}>
            {personal.email && <span>Email {personal.email}</span>}
            {personal.phone && <span>Phone {personal.phone}</span>}
            {personal.city && <span>Location {personal.city}</span>}
            {personal.linkedin && <span>in {personal.linkedin}</span>}
            {personal.website && <span>Web {personal.website}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {about && (
          <Section title={cvLabel('about')} color={color}>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>{about}</p>
          </Section>
        )}

        {experience?.length > 0 && (
          <Section title={cvLabel('experience')} color={color}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{exp.position}</strong>
                    <span style={{ color: color }}> · {exp.company}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {education?.length > 0 && (
          <Section title={cvLabel('education')} color={color}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{edu.degree}</strong>
                    <span style={{ color: color }}> · {edu.school}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.field && <p style={{ color: '#6b7280', fontSize: '12px' }}>{edu.field}</p>}
              </div>
            ))}
          </Section>
        )}

        {skills?.length > 0 && (
          <Section title={cvLabel('skills')} color={color}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{skill.name}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {languages?.length > 0 && (
          <Section title={cvLabel('languages')} color={color}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {languages.map((lang, i) => (
                <span key={i} style={{ padding: '4px 10px', backgroundColor: color + '15', color, borderRadius: '20px', fontSize: '12px', border: `1px solid ${color}40` }}>
                  {lang.name} · {lang.level}
                </span>
              ))}
            </div>
          </Section>
        )}

        {projects?.length > 0 && (
          <Section title={cvLabel('projects')} color={color}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#111827' }}>{proj.name}</strong>
                {proj.link && <a href={proj.link} style={{ color, fontSize: '11px', marginLeft: '8px' }}>{proj.link}</a>}
                {proj.description && <p style={{ color: '#4b5563', marginTop: '3px', lineHeight: '1.5' }}>{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {certificates?.length > 0 && (
          <Section title={cvLabel('certificates')} color={color}>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ color: '#6b7280', fontSize: '12px' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ fontSize: '11px', color: '#9ca3af' }}>{cert.date}</span>}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '13px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: `1px solid ${color}30`, paddingBottom: '4px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





