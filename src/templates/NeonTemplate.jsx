import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function NeonTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#A855F7';
  const font = customization?.font || 'Inter';
  const bg = '#0F0F1A';

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: bg, color: '#E2E8F0', display: 'flex', flexDirection: 'column', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ padding: '28px 28px 20px', borderBottom: `1px solid ${color}40`, background: `linear-gradient(135deg, ${color}18 0%, transparent 60%)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personal.photo && (
            <img src={personal.photo} alt="photo" style={{ width: '76px', height: '76px', borderRadius: '12px', objectFit: 'cover', border: `2px solid ${color}`, boxShadow: `0 0 20px ${color}60` }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              {personal.firstName} <span style={{ color }}>{personal.lastName}</span>
            </h1>
            <p style={{ fontSize: '13px', color: `${color}CC`, fontWeight: '500', marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10px', color: '#94A3B8' }}>
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.city && <span>{personal.city}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left */}
        <div style={{ width: '38%', padding: '20px 16px', borderRight: `1px solid ${color}25`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {skills?.length > 0 && (
            <Block title={cvLabel('skills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: '#CBD5E1' }}>{skill.name}</span>
                    <span style={{ color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: '#1E293B', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, backgroundColor: color, borderRadius: '2px', boxShadow: `0 0 6px ${color}` }} />
                  </div>
                </div>
              ))}
            </Block>
          )}

          {languages?.length > 0 && (
            <Block title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px', color: '#CBD5E1' }}>
                  <span>{lang.name}</span>
                  <span style={{ color: `${color}CC`, fontSize: '10px' }}>{lang.level}</span>
                </div>
              ))}
            </Block>
          )}

          {certificates?.length > 0 && (
            <Block title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 8px', borderRadius: '6px', backgroundColor: `${color}12`, border: `1px solid ${color}30` }}>
                  <strong style={{ fontSize: '11px', color: '#E2E8F0' }}>{cert.name}</strong>
                  {cert.issuer && <p style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{cert.issuer}</p>}
                </div>
              ))}
            </Block>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: 1, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {about && (
            <Block title={cvLabel('about')} color={color}>
              <p style={{ color: '#94A3B8', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </Block>
          )}

          {experience?.length > 0 && (
            <Block title={cvLabel('experience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingLeft: '10px', borderLeft: `2px solid ${color}50` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#F1F5F9' }}>{exp.position}</strong>
                      <p style={{ fontSize: '11px', color, marginTop: '1px' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {exp.startDate} – {exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </Block>
          )}

          {education?.length > 0 && (
            <Block title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: `2px solid ${color}30` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#F1F5F9' }}>{edu.degree}</strong>
                      <p style={{ fontSize: '11px', color: `${color}CC`, marginTop: '1px' }}>{edu.school}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#64748B', whiteSpace: 'nowrap' }}>{edu.startDate} – {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </Block>
          )}

          {projects?.length > 0 && (
            <Block title={cvLabel('projects')} color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '8px 10px', borderRadius: '8px', backgroundColor: `${color}10`, border: `1px solid ${color}30` }}>
                  <strong style={{ fontSize: '12px', color: '#F1F5F9' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ fontSize: '10px', color, marginLeft: '6px' }}>{proj.tech}</span>}
                  {proj.description && <p style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>{proj.description}</p>}
                </div>
              ))}
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}

function Block({ title, color, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', width: '20px', height: '1px', backgroundColor: color, boxShadow: `0 0 4px ${color}` }} />
        {title}
        <span style={{ display: 'inline-block', flex: 1, height: '1px', backgroundColor: `${color}30` }} />
      </h2>
      {children}
    </div>
  );
}
