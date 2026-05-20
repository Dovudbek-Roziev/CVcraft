import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function InfographicTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#0891B2';
  const font = customization?.font || 'Poppins';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#111827', display: 'flex', minHeight: '297mm' }}>
      {/* Left sidebar */}
      <div style={{ width: '34%', backgroundColor: color, color: 'white', padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="photo" style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', margin: '0 auto 10px' }} />
          ) : (
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '28px', fontWeight: '700' }}>
              {personal.firstName?.charAt(0)}{personal.lastName?.charAt(0)}
            </div>
          )}
          <h1 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
          <p style={{ fontSize: '11px', opacity: 0.85, fontWeight: '500' }}>{personal.jobTitle}</p>
        </div>

        <InfoBlock title={cvLabel('contact')}>
          {personal.email && <InfoItem icon="✉" text={personal.email} />}
          {personal.phone && <InfoItem icon="☎" text={personal.phone} />}
          {personal.city && <InfoItem icon="⊕" text={`${personal.city}${personal.country ? ', ' + personal.country : ''}`} />}
          {personal.linkedin && <InfoItem icon="in" text={personal.linkedin} />}
          {personal.website && <InfoItem icon="⊞" text={personal.website} />}
        </InfoBlock>

        {skills?.length > 0 && (
          <InfoBlock title={cvLabel('skills')}>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500' }}>{skill.name}</span>
                  <span style={{ opacity: 0.7 }}>{skill.level}%</span>
                </div>
                <div style={{ position: 'relative', height: '5px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${skill.level}%`, backgroundColor: 'white', borderRadius: '10px', opacity: 0.9 }} />
                </div>
              </div>
            ))}
          </InfoBlock>
        )}

        {languages?.length > 0 && (
          <InfoBlock title={cvLabel('languages')}>
            {languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px', opacity: 0.9 }}>
                <span style={{ fontWeight: '500' }}>{lang.name}</span>
                <span style={{ opacity: 0.75 }}>{lang.level}</span>
              </div>
            ))}
          </InfoBlock>
        )}
      </div>

      {/* Right */}
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {about && (
          <MainSection title={cvLabel('about')} color={color}>
            <p style={{ color: '#4B5563', lineHeight: '1.7', fontSize: '11px' }}>{about}</p>
          </MainSection>
        )}

        {experience?.length > 0 && (
          <MainSection title={cvLabel('experience')} color={color}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                <div style={{ width: '6px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                  {i < experience.length - 1 && <div style={{ flex: 1, width: '1px', backgroundColor: `${color}30`, minHeight: '20px', marginTop: '3px' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color, marginTop: '1px', fontWeight: '600' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#6B7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {education?.length > 0 && (
          <MainSection title={cvLabel('education')} color={color}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px', padding: '8px 10px', backgroundColor: `${color}08`, borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '600' }}>{edu.school}</p>
                {edu.field && <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '1px' }}>{edu.field}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {projects?.length > 0 && (
          <MainSection title={cvLabel('projects')} color={color}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {projects.map((proj, i) => (
                <div key={i} style={{ padding: '8px 10px', border: `1px solid ${color}30`, borderRadius: '6px', backgroundColor: `${color}05` }}>
                  <strong style={{ fontSize: '11px', color: '#111827' }}>{proj.name}</strong>
                  {proj.tech && <p style={{ fontSize: '10px', color, marginTop: '2px', fontWeight: '600' }}>{proj.tech}</p>}
                  {proj.description && <p style={{ color: '#6B7280', fontSize: '10px', marginTop: '3px', lineHeight: '1.4' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {certificates?.length > 0 && (
          <MainSection title={cvLabel('certificates')} color={color}>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <div>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ color: '#6B7280' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ color: '#9CA3AF', fontSize: '10px' }}>{cert.date}</span>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function InfoBlock({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.6, marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', gap: '6px', fontSize: '10px', marginBottom: '6px', opacity: 0.9, alignItems: 'flex-start' }}>
      <span style={{ minWidth: '12px', textAlign: 'center', marginTop: '1px' }}>{icon}</span>
      <span style={{ wordBreak: 'break-all', lineHeight: '1.4' }}>{text}</span>
    </div>
  );
}

function MainSection({ title, color, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '20px', height: '3px', backgroundColor: color, borderRadius: '2px' }} />
        <h2 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: `${color}25` }} />
      </div>
      {children}
    </div>
  );
}
