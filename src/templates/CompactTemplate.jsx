import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function CompactTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1E293B';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, fontSize: '11px', color: '#1E293B', padding: '20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: `2px solid ${color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {personal.photo && (
              <img src={personal.photo} alt="photo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
            )}
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color, marginBottom: '2px', letterSpacing: '-0.3px' }}>
                {personal.firstName} {personal.lastName}
              </h1>
              <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>{personal.jobTitle}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#64748B', lineHeight: '1.8' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}{personal.country ? ', ' + personal.country : ''}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>
      </div>

      {about && (
        <Section title={cvLabel('about')} color={color}>
          <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '11px' }}>{about}</p>
        </Section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div>
          {experience?.length > 0 && (
            <Section title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '9px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color, fontSize: '11px' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>
                      {exp.startDate}–{exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>{exp.company}</div>
                  {exp.description && <p style={{ color: '#475569', fontSize: '10px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {education?.length > 0 && (
            <Section title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color, fontSize: '11px' }}>{edu.degree}</strong>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{edu.startDate}–{edu.endDate}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>{edu.school}</div>
                  {edu.field && <div style={{ fontSize: '10px', color: '#94A3B8' }}>{edu.field}</div>}
                </div>
              ))}
            </Section>
          )}
        </div>

        <div>
          {skills?.length > 0 && (
            <Section title={cvLabel('skills')} color={color}>
              <div style={{ columns: 2, gap: '8px' }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ marginBottom: '5px', breakInside: 'avoid' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '2px' }}>
                      <span style={{ color: '#374151' }}>{skill.name}</span>
                      <span style={{ color: '#94A3B8' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#E2E8F0', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {languages?.length > 0 && (
            <Section title={cvLabel('languages')} color={color}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {languages.map((lang, i) => (
                  <span key={i} style={{ fontSize: '10px', padding: '2px 8px', border: `1px solid ${color}40`, borderRadius: '3px', color: '#374151' }}>
                    {lang.name} <span style={{ color: '#94A3B8' }}>{lang.level}</span>
                  </span>
                ))}
              </div>
            </Section>
          )}

          {projects?.length > 0 && (
            <Section title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '7px' }}>
                  <strong style={{ color, fontSize: '11px' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ fontSize: '10px', color: '#64748B', marginLeft: '4px' }}>({proj.tech})</span>}
                  {proj.description && <p style={{ color: '#475569', fontSize: '10px', lineHeight: '1.4', marginTop: '2px' }}>{proj.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {certificates?.length > 0 && (
            <Section title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '5px', fontSize: '10px' }}>
                  <strong style={{ color }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ color: '#64748B' }}> · {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#94A3B8' }}> · {cert.date}</span>}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color, borderBottom: `1px solid ${color}25`, paddingBottom: '3px', marginBottom: '7px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
