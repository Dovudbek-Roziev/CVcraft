import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ModernTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#3B82F6';
  const font = customization?.font || 'Poppins';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, display: 'flex', minHeight: '297mm' }}>
      {/* Left sidebar */}
      <div style={{ width: '35%', backgroundColor: color, padding: '24px 16px', color: 'white', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {personal.photo && (
          <div style={{ textAlign: 'center' }}>
            <img src={personal.photo} alt="photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', margin: '0 auto' }} />
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{personal.firstName} {personal.lastName}</h1>
          <p style={{ fontSize: '12px', opacity: 0.85 }}>{personal.jobTitle}</p>
        </div>

        {/* Contact */}
        <SideSection title={cvLabel('contact')}>
          {personal.email && <ContactItem icon="Email" text={personal.email} />}
          {personal.phone && <ContactItem icon="Phone" text={personal.phone} />}
          {personal.city && <ContactItem icon="Location" text={personal.city} />}
          {personal.linkedin && <ContactItem icon="in" text={personal.linkedin} />}
          {personal.website && <ContactItem icon="Web" text={personal.website} />}
        </SideSection>

        {skills?.length > 0 && (
          <SideSection title={cvLabel('skills')}>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span>{skill.name}</span>
                  <span style={{ opacity: 0.7 }}>{skill.level}%</span>
                </div>
                <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: 'white', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {languages?.length > 0 && (
          <SideSection title={cvLabel('languages')}>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '11px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{lang.name}</span>
                <span style={{ opacity: 0.7 }}>{lang.level}</span>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Right main */}
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {about && (
          <MainSection title={cvLabel('about')} color={color}>
            <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '12px' }}>{about}</p>
          </MainSection>
        )}

        {experience?.length > 0 && (
          <MainSection title={cvLabel('experience')} color={color}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                    <p style={{ color, fontSize: '11px' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                    {exp.startDate} - {exp.current ? cvLabel('present') : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {education?.length > 0 && (
          <MainSection title={cvLabel('education')} color={color}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '11px' }}>{edu.school}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {projects?.length > 0 && (
          <MainSection title={cvLabel('projects')} color={color}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
                <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {certificates?.length > 0 && (
          <MainSection title={cvLabel('certificates')} color={color}>
            {certificates.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <div>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  {cert.issuer && <span style={{ color: '#6b7280' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ color: '#9ca3af', fontSize: '11px' }}>{cert.date}</span>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideSection({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function MainSection({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '13px', fontWeight: '700', color, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', width: '20px', height: '2px', backgroundColor: color }} />
        {title}
      </h2>
      {children}
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', marginBottom: '6px', opacity: 0.9 }}>
      <span style={{ width: '14px', textAlign: 'center' }}>{icon}</span>
      <span style={{ wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}





