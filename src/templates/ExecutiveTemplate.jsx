import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ExecutiveTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1f2937';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937', padding: '0' }}>
      {/* Header */}
      <div style={{ backgroundColor: color, padding: '36px 40px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {personal.photo && (
              <img src={personal.photo} alt="" style={{ width: '88px', height: '88px', borderRadius: '4px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
            )}
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '300', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
                {personal.firstName} <span style={{ fontWeight: '700' }}>{personal.lastName}</span>
              </h1>
              <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.6 }}>{personal.jobTitle}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', opacity: 0.75, lineHeight: '1.8' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #c9a227, #e8c547, #c9a227)' }} />

      <div style={{ padding: '32px 40px' }}>
        {about && (
          <div style={{ marginBottom: '28px', padding: '16px 20px', backgroundColor: '#f9fafb', borderLeft: '4px solid #c9a227' }}>
            <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '12px', fontStyle: 'italic' }}>{about}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px' }}>
          <div>
            {experience?.length > 0 && (
              <ExecSection title={cvLabel('executiveExperience')} color={color}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: i < experience.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <strong style={{ fontSize: '14px', color: '#111827', display: 'block', marginBottom: '2px' }}>{exp.position}</strong>
                        <span style={{ color: '#c9a227', fontSize: '12px', fontWeight: '600' }}>{exp.company}</span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '3px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                        {exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p style={{ color: '#4b5563', fontSize: '11px', lineHeight: '1.6' }}>{exp.description}</p>}
                  </div>
                ))}
              </ExecSection>
            )}
            {education?.length > 0 && (
              <ExecSection title={cvLabel('education')} color={color}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                      <p style={{ color: '#c9a227', fontSize: '12px', fontWeight: '500' }}>{edu.school}</p>
                      {edu.field && <p style={{ fontSize: '11px', color: '#6b7280' }}>{edu.field}</p>}
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate}-{edu.endDate}</span>
                  </div>
                ))}
              </ExecSection>
            )}
            {projects?.length > 0 && (
              <ExecSection title={cvLabel('keyProjects')} color={color}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                    {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </ExecSection>
            )}
          </div>
          <div>
            {skills?.length > 0 && (
              <ExecSection title="Core Competencies" color={color}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#c9a227', borderRadius: '1px', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#374151', flex: 1 }}>{skill.name}</span>
                    <div style={{ width: '50px', height: '2px', backgroundColor: '#e5e7eb' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: '#c9a227' }} />
                    </div>
                  </div>
                ))}
              </ExecSection>
            )}
            {languages?.length > 0 && (
              <ExecSection title={cvLabel('languages')} color={color}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', paddingBottom: '6px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ color: '#9ca3af' }}>{lang.level}</span>
                  </div>
                ))}
              </ExecSection>
            )}
            {certificates?.length > 0 && (
              <ExecSection title={cvLabel('certificates')} color={color}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: '#f9fafb', borderLeft: '2px solid #c9a227' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</div>}
                  </div>
                ))}
              </ExecSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingBottom: '6px', borderBottom: `1px solid #e5e7eb` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





