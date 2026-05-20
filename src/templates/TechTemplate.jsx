import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function TechTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#00d4aa';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: '#0d1117', color: '#c9d1d9' }}>
      {/* Terminal header */}
      <div style={{ backgroundColor: '#161b22', padding: '24px 28px', borderBottom: '1px solid #30363d' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840' }} />
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#8b949e', marginBottom: '8px' }}>
          <span style={{ color: '#58a6ff' }}>~</span> cat resume.json
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${color}` }} />
          ) : (
            <div style={{ width: '70px', height: '70px', borderRadius: '8px', backgroundColor: '#21262d', border: `1px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color, flexShrink: 0 }}>
              {personal.firstName?.[0]}{personal.lastName?.[0]}
            </div>
          )}
          <div>
            <div style={{ fontFamily: 'monospace', color: '#8b949e', fontSize: '10px' }}>{'{'}</div>
            <div style={{ paddingLeft: '16px', fontFamily: 'monospace', fontSize: '11px' }}>
              <div><span style={{ color: '#7ee787' }}>"name"</span>: <span style={{ color: '#a5d6ff' }}>"{personal.firstName} {personal.lastName}"</span>,</div>
              <div><span style={{ color: '#7ee787' }}>"title"</span>: <span style={{ color: '#a5d6ff' }}>"{personal.jobTitle}"</span>,</div>
              {personal.email && <div><span style={{ color: '#7ee787' }}>"email"</span>: <span style={{ color: '#a5d6ff' }}>"{personal.email}"</span>,</div>}
              {personal.phone && <div><span style={{ color: '#7ee787' }}>"phone"</span>: <span style={{ color: '#a5d6ff' }}>"{personal.phone}"</span>,</div>}
              {personal.city && <div><span style={{ color: '#7ee787' }}>"location"</span>: <span style={{ color: '#a5d6ff' }}>"{personal.city}"</span></div>}
            </div>
            <div style={{ fontFamily: 'monospace', color: '#8b949e', fontSize: '10px' }}>{'}'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', minHeight: '100%' }}>
        <div style={{ padding: '20px 24px', borderRight: '1px solid #30363d' }}>
          {about && (
            <TSection title={`// ${cvLabel('about').toLowerCase()}`} color={color}>
              <p style={{ color: '#8b949e', lineHeight: '1.7', fontSize: '11px', fontFamily: 'monospace' }}>{about}</p>
            </TSection>
          )}
          {experience?.length > 0 && (
            <TSection title={`// ${cvLabel('shortExperience').toLowerCase()}`} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px', padding: '10px', backgroundColor: '#161b22', borderRadius: '6px', border: '1px solid #30363d' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#7ee787', fontFamily: 'monospace', fontSize: '12px', fontWeight: '600' }}>{exp.position}</span>
                    <span style={{ color: '#6e7681', fontSize: '10px', fontFamily: 'monospace' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                  </div>
                  <div style={{ color, fontFamily: 'monospace', fontSize: '11px', marginBottom: '4px' }}>@ {exp.company}</div>
                  {exp.description && <p style={{ color: '#8b949e', fontSize: '10px', lineHeight: '1.5', fontFamily: 'monospace' }}>{exp.description}</p>}
                </div>
              ))}
            </TSection>
          )}
          {education?.length > 0 && (
            <TSection title={`// ${cvLabel('education').toLowerCase()}`} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 10px', backgroundColor: '#161b22', borderRadius: '6px', border: '1px solid #30363d' }}>
                  <div style={{ color: '#7ee787', fontFamily: 'monospace', fontSize: '12px', fontWeight: '600' }}>{edu.degree}</div>
                  <div style={{ color, fontFamily: 'monospace', fontSize: '10px' }}>@ {edu.school} | {edu.startDate}-{edu.endDate}</div>
                </div>
              ))}
            </TSection>
          )}
          {projects?.length > 0 && (
            <TSection title={`// ${cvLabel('projects').toLowerCase()}`} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 10px', backgroundColor: '#161b22', borderRadius: '6px', border: '1px solid #30363d' }}>
                  <div style={{ color: '#7ee787', fontFamily: 'monospace', fontSize: '12px', fontWeight: '600' }}>{proj.name}</div>
                  {proj.link && <div style={{ color: '#58a6ff', fontSize: '10px', fontFamily: 'monospace' }}>{proj.link}</div>}
                  {proj.description && <p style={{ color: '#8b949e', fontSize: '10px', fontFamily: 'monospace', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </TSection>
          )}
        </div>

        <div style={{ padding: '20px 16px' }}>
          {skills?.length > 0 && (
            <TSection title={`// ${cvLabel('skills').toLowerCase()}`} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px', fontFamily: 'monospace', fontSize: '11px' }}>
                  <span style={{ color: '#7ee787' }}>{skill.name}</span>
                  <span style={{ color: '#6e7681' }}> [{skill.level}%]</span>
                  <div style={{ height: '3px', backgroundColor: '#21262d', borderRadius: '1px', marginTop: '3px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '1px' }} />
                  </div>
                </div>
              ))}
            </TSection>
          )}
          {languages?.length > 0 && (
            <TSection title={`// ${cvLabel('languages').toLowerCase()}`} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontFamily: 'monospace', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ color: '#7ee787' }}>{lang.name}</span>
                  <span style={{ color: '#6e7681' }}>: </span>
                  <span style={{ color: '#a5d6ff' }}>"{lang.level}"</span>
                </div>
              ))}
            </TSection>
          )}
          {certificates?.length > 0 && (
            <TSection title={`// ${cvLabel('certificates').toLowerCase()}`} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', fontFamily: 'monospace', fontSize: '10px', padding: '6px 8px', backgroundColor: '#161b22', borderRadius: '4px' }}>
                  <div style={{ color: '#7ee787' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ color: '#6e7681' }}>{cert.issuer}</div>}
                </div>
              ))}
            </TSection>
          )}
        </div>
      </div>
    </div>
  );
}

function TSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: '700', color, marginBottom: '10px' }}>{title}</h2>
      {children}
    </div>
  );
}





