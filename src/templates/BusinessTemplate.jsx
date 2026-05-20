import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function BusinessTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#1D4ED8';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Top blue bar */}
      <div style={{ backgroundColor: color, padding: '28px 32px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personal.photo && (
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
            <p style={{ fontSize: '14px', opacity: 0.85, fontWeight: '500' }}>{personal.jobTitle}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', opacity: 0.8 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.city && <div>{personal.city}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0' }}>
        {/* Main */}
        <div style={{ padding: '24px 20px 24px 32px' }}>
          {about && (
            <BizSection title={cvLabel('professionalSummary')} color={color}>
              <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '12px' }}>{about}</p>
            </BizSection>
          )}
          {experience?.length > 0 && (
            <BizSection title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#111827' }}>{exp.position}</div>
                      <div style={{ color, fontSize: '12px', fontWeight: '500' }}>{exp.company}</div>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                      {exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </BizSection>
          )}
          {education?.length > 0 && (
            <BizSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '13px', color: '#111827' }}>{edu.degree}</div>
                    <div style={{ fontSize: '12px', color }}>{edu.school}</div>
                    {edu.field && <div style={{ fontSize: '11px', color: '#6b7280' }}>{edu.field}</div>}
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </BizSection>
          )}
          {projects?.length > 0 && (
            <BizSection title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: '600', color: '#111827', fontSize: '13px' }}>{proj.name}</div>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </BizSection>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ backgroundColor: '#f8fafc', padding: '24px 16px', borderLeft: '1px solid #e5e7eb' }}>
          {skills?.length > 0 && (
            <SideBiz title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </SideBiz>
          )}
          {languages?.length > 0 && (
            <SideBiz title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '11px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color: '#9ca3af' }}>{lang.level}</span>
                </div>
              ))}
            </SideBiz>
          )}
          {certificates?.length > 0 && (
            <SideBiz title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer}</div>}
                </div>
              ))}
            </SideBiz>
          )}
        </div>
      </div>
    </div>
  );
}

function BizSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '24px', height: '2px', backgroundColor: color, display: 'inline-block' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}

function SideBiz({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '10px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', borderBottom: `2px solid ${color}`, paddingBottom: '4px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}





