import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function DarkTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#60A5FA';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: '#0f172a', color: '#e2e8f0', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '38%', backgroundColor: '#1e293b', padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {personal.photo ? (
          <img src={personal.photo} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${color}`, margin: '0 auto' }} />
        ) : (
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: color + '30', border: `2px solid ${color}`, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color }}>
            {personal.firstName?.[0]}{personal.lastName?.[0]}
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
          <p style={{ fontSize: '12px', color, fontWeight: '500' }}>{personal.jobTitle}</p>
        </div>

        <DarkSide title={cvLabel('contact')} color={color}>
          {personal.email && <DItem text={personal.email} />}
          {personal.phone && <DItem text={personal.phone} />}
          {personal.city && <DItem text={personal.city} />}
          {personal.linkedin && <DItem text={personal.linkedin} />}
          {personal.website && <DItem text={personal.website} />}
        </DarkSide>

        {skills?.length > 0 && (
          <DarkSide title={cvLabel('skills')} color={color}>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: '#cbd5e1' }}>{skill.name}</span>
                  <span style={{ color: '#64748b' }}>{skill.level}%</span>
                </div>
                <div style={{ height: '3px', backgroundColor: '#334155', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </DarkSide>
        )}

        {languages?.length > 0 && (
          <DarkSide title={cvLabel('languages')} color={color}>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{lang.name}</span>
                <span style={{ color: '#64748b' }}>{lang.level}</span>
              </div>
            ))}
          </DarkSide>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '28px 20px' }}>
        {about && (
          <DarkMain title={cvLabel('about')} color={color}>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
          </DarkMain>
        )}
        {experience?.length > 0 && (
          <DarkMain title={cvLabel('shortExperience')} color={color}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '14px', padding: '10px 12px', backgroundColor: '#1e293b', borderRadius: '8px', borderLeft: `2px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: 'white', fontSize: '13px' }}>{exp.position}</div>
                    <div style={{ color, fontSize: '11px' }}>{exp.company}</div>
                  </div>
                  <span style={{ fontSize: '10px', color: '#475569', whiteSpace: 'nowrap' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                </div>
                {exp.description && <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </DarkMain>
        )}
        {education?.length > 0 && (
          <DarkMain title={cvLabel('education')} color={color}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
                <div style={{ fontWeight: '600', color: 'white', fontSize: '13px' }}>{edu.degree}</div>
                <div style={{ color, fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</div>
              </div>
            ))}
          </DarkMain>
        )}
        {projects?.length > 0 && (
          <DarkMain title={cvLabel('projects')} color={color}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
                <div style={{ fontWeight: '600', color: 'white', fontSize: '13px' }}>{proj.name}</div>
                {proj.description && <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </DarkMain>
        )}
        {certificates?.length > 0 && (
          <DarkMain title={cvLabel('certificates')} color={color}>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: '500' }}>{cert.name} {cert.issuer && `· ${cert.issuer}`}</span>
                {cert.date && <span style={{ color: '#475569' }}>{cert.date}</span>}
              </div>
            ))}
          </DarkMain>
        )}
      </div>
    </div>
  );
}

function DarkSide({ title, color, children }) {
  return (
    <div>
      <h3 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#475569', marginBottom: '8px', borderBottom: `1px solid #334155`, paddingBottom: '4px' }}>{title}</h3>
      {children}
    </div>
  );
}

function DarkMain({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '20px', height: '1px', backgroundColor: color }} />
        {title}
      </h2>
      {children}
    </div>
  );
}

function DItem({ text }) {
  return <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '5px', wordBreak: 'break-all' }}>{text}</div>;
}





