import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function SwissTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#DC2626';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, padding: '0', color: '#111827', minHeight: '297mm' }}>
      {/* Top accent bar */}
      <div style={{ height: '6px', backgroundColor: color }} />

      <div style={{ padding: '28px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {personal.photo && (
              <img src={personal.photo} alt="photo" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '0' }} />
            )}
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', letterSpacing: '-1px', textTransform: 'uppercase', marginBottom: '4px', lineHeight: '1' }}>
                {personal.firstName} {personal.lastName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '3px', backgroundColor: color }} />
                <p style={{ fontSize: '12px', color: color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{personal.jobTitle}</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#6B7280', lineHeight: '1.9' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}{personal.country ? ', ' + personal.country : ''}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '28px' }}>
          {/* Main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {about && (
              <SwissSection num="01" title={cvLabel('about')} color={color}>
                <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
              </SwissSection>
            )}

            {experience?.length > 0 && (
              <SwissSection num="02" title={cvLabel('experience')} color={color}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: i < experience.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{exp.position}</strong>
                        <p style={{ fontSize: '11px', color, fontWeight: '700', marginTop: '2px', letterSpacing: '0.5px' }}>{exp.company}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                        {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '5px', lineHeight: '1.5' }}>{exp.description}</p>}
                  </div>
                ))}
              </SwissSection>
            )}

            {education?.length > 0 && (
              <SwissSection num="03" title={cvLabel('education')} color={color}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{edu.degree}</strong>
                        <p style={{ fontSize: '11px', color, fontWeight: '700', marginTop: '2px' }}>{edu.school}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{edu.startDate} – {edu.endDate}</span>
                    </div>
                    {edu.field && <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{edu.field}</p>}
                  </div>
                ))}
              </SwissSection>
            )}

            {projects?.length > 0 && (
              <SwissSection num="04" title={cvLabel('projects')} color={color}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    <strong style={{ fontSize: '12px', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{proj.name}</strong>
                    {proj.tech && <span style={{ fontSize: '10px', color, marginLeft: '8px', fontWeight: '700' }}>{proj.tech}</span>}
                    {proj.description && <p style={{ color: '#4B5563', fontSize: '11px', marginTop: '3px', lineHeight: '1.5' }}>{proj.description}</p>}
                  </div>
                ))}
              </SwissSection>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {skills?.length > 0 && (
              <SwissSection num="—" title={cvLabel('skills')} color={color}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ marginBottom: '7px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                      <span style={{ color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{skill.name}</span>
                      <span style={{ color }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#F3F4F6' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </SwissSection>
            )}

            {languages?.length > 0 && (
              <SwissSection num="—" title={cvLabel('languages')} color={color}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '5px', borderBottom: '1px solid #F3F4F6', paddingBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ color }}>{lang.level}</span>
                  </div>
                ))}
              </SwissSection>
            )}

            {certificates?.length > 0 && (
              <SwissSection num="—" title={cvLabel('certificates')} color={color}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '7px' }}>
                    <strong style={{ fontSize: '10px', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{cert.name}</strong>
                    {cert.issuer && <p style={{ fontSize: '10px', color: '#6B7280' }}>{cert.issuer}</p>}
                  </div>
                ))}
              </SwissSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SwissSection({ num, title, color, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: '900', color, minWidth: '20px' }}>{num}</span>
        <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
      </div>
      {children}
    </div>
  );
}
