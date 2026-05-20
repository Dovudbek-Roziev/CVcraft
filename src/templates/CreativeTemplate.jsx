import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function CreativeTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#7C3AED';
  const font = customization?.font || 'Poppins';

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: '#faf5ff', color: '#1f2937', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: color + '20' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: color + '15' }} />

      <div style={{ position: 'relative', padding: '32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', alignItems: 'center' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '90px', height: '90px', borderRadius: '20px', objectFit: 'cover', boxShadow: `0 8px 24px ${color}40` }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '20px', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', background: `linear-gradient(135deg, ${color}, #db2777)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
              {personal.firstName} {personal.lastName}
            </h1>
            <p style={{ color, fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', color: '#6b7280' }}>
              {personal.email && <span>Email {personal.email}</span>}
              {personal.phone && <span>Phone {personal.phone}</span>}
              {personal.city && <span>Location {personal.city}</span>}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
          <div>
            {about && (
              <CSection title={cvLabel('about')} color={color}>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
              </CSection>
            )}
            {experience?.length > 0 && (
              <CSection title={cvLabel('shortExperience')} color={color}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '14px', padding: '10px 12px', backgroundColor: 'white', borderRadius: '10px', borderLeft: `3px solid ${color}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontWeight: '700', color: '#111827', fontSize: '13px' }}>{exp.position}</div>
                    <div style={{ color, fontSize: '11px', marginBottom: '4px' }}>{exp.company} · {exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</div>
                    {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                  </div>
                ))}
              </CSection>
            )}
            {education?.length > 0 && (
              <CSection title={cvLabel('education')} color={color}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '13px' }}>{edu.degree}</div>
                    <div style={{ color, fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</div>
                  </div>
                ))}
              </CSection>
            )}
            {projects?.length > 0 && (
              <CSection title={cvLabel('projects')} color={color}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontWeight: '600', color: '#111827', fontSize: '13px' }}>{proj.name}</div>
                    {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </CSection>
            )}
          </div>
          <div>
            {skills?.length > 0 && (
              <CSection title={cvLabel('skills')} color={color}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '500', color: '#374151' }}>{skill.name}</span>
                      <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#ede9fe', borderRadius: '3px' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, background: `linear-gradient(to right, ${color}, #db2777)`, borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </CSection>
            )}
            {languages?.length > 0 && (
              <CSection title={cvLabel('languages')} color={color}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ marginBottom: '6px', padding: '4px 10px', backgroundColor: 'white', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <span style={{ fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                    <span style={{ color }}>{lang.level}</span>
                  </div>
                ))}
              </CSection>
            )}
            {certificates?.length > 0 && (
              <CSection title={cvLabel('certificates')} color={color}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer}</div>}
                  </div>
                ))}
              </CSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}





