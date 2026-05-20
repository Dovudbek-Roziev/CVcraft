import React from 'react';
import { cvLabel } from '../utils/cvLabels.js';

export default function MarketingTemplate({ data }) {
  const { personal, about, experience, education, skills, languages, projects, certificates, customization } = data;
  const color = customization?.primaryColor || '#D97706';
  const font = customization?.font || 'Montserrat';

  return (
    <div className="cv-a4 bg-white" style={{ fontFamily: font, color: '#1f2937' }}>
      {/* Dynamic header */}
      <div style={{ background: `linear-gradient(135deg, #111827 0%, #1f2937 60%, ${color}40 100%)`, padding: '28px 32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10px', right: '40px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: color, opacity: 0.25 }} />
        <div style={{ position: 'absolute', top: '20px', right: '100px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color, opacity: 0.15 }} />
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${color}`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: color + '30', border: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color, flexShrink: 0 }}>
              Chart
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px', letterSpacing: '0.5px' }}>{personal.firstName} {personal.lastName}</h1>
            <p style={{ color, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{personal.jobTitle}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '10px', opacity: 0.8 }}>
              {personal.email && <span>Email {personal.email}</span>}
              {personal.phone && <span>Phone {personal.phone}</span>}
              {personal.city && <span>Location {personal.city}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
              {personal.website && <span>Web {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Orange accent line */}
      <div style={{ height: '3px', backgroundColor: color }} />

      <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div>
          {about && (
            <MktSection title="Marketing Vision" color={color}>
              <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '12px' }}>{about}</p>
            </MktSection>
          )}
          {experience?.length > 0 && (
            <MktSection title={cvLabel('campaignExperience')} color={color}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#111827' }}>{exp.position}</strong>
                      <p style={{ color, fontSize: '12px', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af', backgroundColor: color + '15', padding: '2px 8px', borderRadius: '10px', border: `1px solid ${color}30`, whiteSpace: 'nowrap' }}>
                      {exp.startDate}-{exp.current ? cvLabel('present') : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </MktSection>
          )}
          {projects?.length > 0 && (
            <MktSection title="Key Campaigns" color={color}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#fffbeb', borderRadius: '8px', borderLeft: `3px solid ${color}` }}>
                  <strong style={{ fontSize: '13px', color: '#111827' }}>{proj.name}</strong>
                  {proj.description && <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' }}>{proj.description}</p>}
                </div>
              ))}
            </MktSection>
          )}
          {education?.length > 0 && (
            <MktSection title={cvLabel('education')} color={color}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#111827' }}>{edu.degree}</strong>
                    <p style={{ color, fontSize: '11px' }}>{edu.school}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{edu.startDate}-{edu.endDate}</span>
                </div>
              ))}
            </MktSection>
          )}
        </div>
        <div>
          {skills?.length > 0 && (
            <MktSection title={cvLabel('marketingSkills')} color={color}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#9ca3af' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#fef3c7', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, background: `linear-gradient(to right, ${color}, #f59e0b)`, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </MktSection>
          )}
          {languages?.length > 0 && (
            <MktSection title={cvLabel('languages')} color={color}>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', padding: '4px 8px', backgroundColor: '#fffbeb', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '600', color: '#374151' }}>{lang.name}</span>
                  <span style={{ color }}>{lang.level}</span>
                </div>
              ))}
            </MktSection>
          )}
          {certificates?.length > 0 && (
            <MktSection title={cvLabel('certificates')} color={color}>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '6px 10px', backgroundColor: '#fffbeb', borderRadius: '8px', border: `1px solid ${color}30` }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</div>}
                </div>
              ))}
            </MktSection>
          )}
          {/* KPI metrics placeholder */}
          <MktSection title="KPI Metrics" color={color}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[{ label: 'ROI', value: '340%' }, { label: 'CTR', value: '8.5%' }, { label: 'Leads', value: '12K+' }, { label: 'Conv', value: '4.2%' }].map((kpi, i) => (
                <div key={i} style={{ padding: '8px', backgroundColor: '#111827', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color }}>{kpi.value}</div>
                  <div style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>{kpi.label}</div>
                </div>
              ))}
            </div>
          </MktSection>
        </div>
      </div>
    </div>
  );
}

function MktSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '800', color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${color}` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}





