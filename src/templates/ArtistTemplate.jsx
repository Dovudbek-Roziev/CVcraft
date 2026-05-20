import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function ArtistTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#DB2777';
  const font = customization?.font || 'Raleway';

  return (
    <div className="cv-a4" style={{ fontFamily: font, backgroundColor: '#fdf2f8', color: '#1f2937', position: 'relative' }}>
      {/* Vertical color stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', background: `linear-gradient(to bottom, ${color}, #8B5CF6)` }} />

      <div style={{ paddingLeft: '28px' }}>
        {/* Header */}
        <div style={{ padding: '28px 24px 20px 12px', borderBottom: `1px solid ${color}30`, marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {personal.photo ? (
              <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', boxShadow: `4px 4px 0 ${color}40` }} />
            ) : (
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: `linear-gradient(135deg, ${color}, #8B5CF6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: 'white', boxShadow: `4px 4px 0 ${color}40`, flexShrink: 0 }}>
                {personal.firstName?.[0]}{personal.lastName?.[0]}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', background: `linear-gradient(135deg, ${color}, #8B5CF6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                {personal.firstName} {personal.lastName}
              </h1>
              <p style={{ color, fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px' }}>{personal.jobTitle}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', color: '#6b7280' }}>
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.city && <span>{personal.city}</span>}
                {personal.website && <a href={personal.website} style={{ color }}>{personal.website}</a>}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px', padding: '0 24px 24px 12px' }}>
          <div>
            {about && (
              <ArtSection title={cvLabel('about')} color={color}>
                <p style={{ color: '#374151', lineHeight: '1.8', fontSize: '12px' }}>{about}</p>
              </ArtSection>
            )}
            {projects?.length > 0 && (
              <ArtSection title={cvLabel('portfolioProjects')} color={color}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 4px rgba(219,39,119,0.1)', borderLeft: `3px solid ${color}` }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                    {proj.link && <a href={proj.link} style={{ color, fontSize: '10px', marginLeft: '8px', display: 'block' }}>{proj.link}</a>}
                    {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{proj.description}</p>}
                  </div>
                ))}
              </ArtSection>
            )}
            {experience?.length > 0 && (
              <ArtSection title={cvLabel('shortExperience')} color={color}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                      <span style={{ fontSize: '10px', color: '#9ca3af' }}>{exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}</span>
                    </div>
                    <p style={{ color, fontSize: '11px', marginBottom: '3px' }}>{exp.company}</p>
                    {exp.description && <p style={{ color: '#6b7280', fontSize: '11px' }}>{exp.description}</p>}
                  </div>
                ))}
              </ArtSection>
            )}
            {education?.length > 0 && (
              <ArtSection title={cvLabel('education')} color={color}>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '11px' }}>{edu.school} · {edu.startDate}-{edu.endDate}</p>
                  </div>
                ))}
              </ArtSection>
            )}
          </div>
          <div>
            {skills?.length > 0 && (
              <ArtSection title={cvLabel('skills')} color={color}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map((skill, i) => (
                    <span key={i} style={{ padding: '4px 12px', background: `linear-gradient(135deg, ${color}15, #8B5CF620)`, border: `1px solid ${color}30`, borderRadius: '20px', fontSize: '11px', color: '#374151', fontWeight: '500' }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </ArtSection>
            )}
            {languages?.length > 0 && (
              <ArtSection title={cvLabel('languages')} color={color}>
                {languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{lang.name}</span>
                    <span style={{ color }}>{lang.level}</span>
                  </div>
                ))}
              </ArtSection>
            )}
            {certificates?.length > 0 && (
              <ArtSection title={cvLabel('certificates')} color={color}>
                {certificates.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(219,39,119,0.08)' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer}</div>}
                  </div>
                ))}
              </ArtSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: color }} />
        <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: color, opacity: 0.6 }} />
        {title}
      </h2>
      {children}
    </div>
  );
}





