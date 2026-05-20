import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function TimelineTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#0D9488';
  const font = customization?.font || 'Inter';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, display: 'flex', minHeight: '297mm' }}>
      {/* Left sidebar */}
      <div style={{ width: '30%', backgroundColor: '#F8FAFB', borderRight: `3px solid ${color}`, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {personal.photo && (
          <div style={{ textAlign: 'center' }}>
            <img src={personal.photo} alt="photo" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: `2px solid ${color}` }} />
          </div>
        )}
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
          <p style={{ fontSize: '11px', color, fontWeight: '600' }}>{personal.jobTitle}</p>
        </div>

        <SideBlock title={cvLabel('contact')} color={color}>
          {personal.email && <ContactRow label="Email" value={personal.email} />}
          {personal.phone && <ContactRow label="Tel" value={personal.phone} />}
          {personal.city && <ContactRow label="Shahar" value={`${personal.city}${personal.country ? ', ' + personal.country : ''}`} />}
          {personal.linkedin && <ContactRow label="LinkedIn" value={personal.linkedin} />}
          {personal.website && <ContactRow label="Web" value={personal.website} />}
        </SideBlock>

        {skills?.length > 0 && (
          <SideBlock title={cvLabel('skills')} color={color}>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '7px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px', color: '#374151' }}>
                  <span style={{ fontWeight: '500' }}>{skill.name}</span>
                  <span style={{ color }}>{skill.level}%</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </SideBlock>
        )}

        {languages?.length > 0 && (
          <SideBlock title={cvLabel('languages')} color={color}>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500' }}>{lang.name}</span>
                <span style={{ color }}>{lang.level}</span>
              </div>
            ))}
          </SideBlock>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {about && (
          <div>
            <SectionHeader title={cvLabel('about')} color={color} />
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
          </div>
        )}

        {experience?.length > 0 && (
          <div>
            <SectionHeader title={cvLabel('experience')} color={color} />
            <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: `2px solid ${color}30` }}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-26px', top: '3px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, border: '2px solid white', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '1px' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education?.length > 0 && (
          <div>
            <SectionHeader title={cvLabel('education')} color={color} />
            <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: `2px solid ${color}30` }}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-26px', top: '3px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: `${color}60`, border: '2px solid white' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '1px' }}>{edu.school}</p>
                      {edu.field && <p style={{ fontSize: '10px', color: '#6b7280' }}>{edu.field}</p>}
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate} – {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects?.length > 0 && (
          <div>
            <SectionHeader title={cvLabel('projects')} color={color} />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '8px', backgroundColor: `${color}08`, borderRadius: '6px', borderLeft: `3px solid ${color}` }}>
                <strong style={{ fontSize: '12px', color: '#111827' }}>{proj.name}</strong>
                {proj.tech && <span style={{ fontSize: '10px', color, marginLeft: '6px' }}>{proj.tech}</span>}
                {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {certificates?.length > 0 && (
          <div>
            <SectionHeader title={cvLabel('certificates')} color={color} />
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <div>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ color: '#6b7280', fontSize: '11px' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ color: '#9ca3af', fontSize: '11px' }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: color, borderRadius: '2px' }} />
      <h2 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{title}</h2>
    </div>
  );
}

function SideBlock({ title, color, children }) {
  return (
    <div>
      <h3 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color, marginBottom: '8px', borderBottom: `1px solid ${color}40`, paddingBottom: '4px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function ContactRow({ label, value }) {
  return (
    <div style={{ fontSize: '10px', color: '#4b5563', marginBottom: '4px' }}>
      <span style={{ color: '#9ca3af', fontSize: '9px', display: 'block' }}>{label}</span>
      <span style={{ wordBreak: 'break-all' }}>{value}</span>
    </div>
  );
}
