import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function PastelTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#EC4899';
  const font = customization?.font || 'Poppins';
  const bgLight = `${color}10`;
  const bgMid = `${color}18`;

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: bgLight, minHeight: '297mm', padding: '0' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${color}25 0%, ${color}12 100%)`, padding: '28px 28px 20px', borderBottom: `2px solid ${color}30` }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          {personal.photo && (
            <img src={personal.photo} alt="photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${color}60`, padding: '2px', backgroundColor: 'white' }} />
          )}
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1F2937', marginBottom: '3px' }}>
              {personal.firstName} <span style={{ color }}>{personal.lastName}</span>
            </h1>
            <p style={{ fontSize: '13px', color: `${color}CC`, fontWeight: '600', marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '10px', color: '#6B7280' }}>
              {personal.email && <Chip icon="✉" text={personal.email} color={color} />}
              {personal.phone && <Chip icon="☎" text={personal.phone} color={color} />}
              {personal.city && <Chip icon="📍" text={personal.city} color={color} />}
              {personal.linkedin && <Chip icon="in" text={personal.linkedin} color={color} />}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 28px', display: 'flex', gap: '20px' }}>
        {/* Left */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {about && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('about')} color={color} />
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '11px' }}>{about}</p>
            </Card>
          )}

          {experience?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('experience')} color={color} />
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: i < experience.length - 1 ? `1px solid ${color}20` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '12px', color: '#111827' }}>{exp.position}</strong>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{exp.startDate}–{exp.current ? cvLabel('present') : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color, marginTop: '2px', fontWeight: '500' }}>{exp.company}</p>
                  {exp.description && <p style={{ color: '#6B7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </Card>
          )}

          {education?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('education')} color={color} />
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '12px', color: '#111827' }}>{edu.degree}</strong>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{edu.startDate}–{edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color, marginTop: '2px' }}>{edu.school}</p>
                  {edu.field && <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '1px' }}>{edu.field}</p>}
                </div>
              ))}
            </Card>
          )}

          {projects?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('projects')} color={color} />
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <strong style={{ fontSize: '12px', color: '#111827' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ fontSize: '10px', color, marginLeft: '6px', fontWeight: '600' }}>{proj.tech}</span>}
                  {proj.description && <p style={{ color: '#6B7280', fontSize: '11px', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </Card>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: '34%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {skills?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('skills')} color={color} />
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                    <span style={{ color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '5px', backgroundColor: '#F3F4F6', borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, borderRadius: '10px' }} />
                  </div>
                </div>
              ))}
            </Card>
          )}

          {languages?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('languages')} color={color} />
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: `${color}15`, borderRadius: '6px' }}>
                  <span style={{ color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ color, fontSize: '10px' }}>{lang.level}</span>
                </div>
              ))}
            </Card>
          )}

          {certificates?.length > 0 && (
            <Card color={color} bgMid={bgMid}>
              <SectionTitle title={cvLabel('certificates')} color={color} />
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: `${color}10`, borderRadius: '6px', border: `1px solid ${color}25` }}>
                  <strong style={{ fontSize: '11px', color: '#111827' }}>{cert.name}</strong>
                  {cert.issuer && <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>{cert.issuer}</p>}
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ color, bgMid, children }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '14px 16px', border: `1px solid ${color}20`, boxShadow: `0 2px 8px ${color}12` }}>
      {children}
    </div>
  );
}

function SectionTitle({ title, color }) {
  return (
    <h2 style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: color, borderRadius: '2px' }} />
      {title}
    </h2>
  );
}

function Chip({ icon, text, color }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: `${color}15`, borderRadius: '20px', fontSize: '10px', color: '#4B5563' }}>
      <span style={{ fontSize: '9px' }}>{icon}</span> {text}
    </span>
  );
}
