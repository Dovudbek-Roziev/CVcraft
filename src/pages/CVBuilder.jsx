import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCV } from '../hooks/useCV.js';
import AIAssistant from '../components/AIAssistant.jsx';
import PremiumModal from '../components/PremiumModal.jsx';
import AdBanner from '../components/AdBanner.jsx';
import { trackCVComplete } from '../utils/analytics.js';

const STEPS = ['personal', 'about', 'experience', 'education', 'skills', 'languages', 'projects', 'certificates'];

function PhotoUpload({ photo, onUpload, onRemove, t }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
        {photo ? (
          <img src={photo} alt="Photo" className="w-full h-full object-cover" />
        ) : (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="btn-secondary cursor-pointer text-sm py-2 px-4 inline-block">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {t('builder.upload_photo')}
        </label>
        {photo && (
          <button onClick={onRemove} className="text-red-500 text-sm hover:text-red-600 transition-colors text-left">
            {t('builder.remove_photo')}
          </button>
        )}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label className="label">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input-field" />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="input-field resize-none" />
    </div>
  );
}

export default function CVBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cv = useCV();
  const { cvData } = cv;
  const [currentStep, setCurrentStep] = useState(0);

  const stepIcons = ['👤', '📝', '💼', '🎓', '⚡', '🌍', '🚀', '🏆'];
  const stepLabels = STEPS.map(s => t(`builder.${s}`));

  const handlePreview = () => {
    trackCVComplete();
    navigate('/preview');
  };

  // Step content renderers
  const renderPersonal = () => (
    <div className="space-y-4">
      <PhotoUpload
        photo={cvData.personal.photo}
        onUpload={(url) => cv.updatePersonal({ photo: url })}
        onRemove={() => cv.updatePersonal({ photo: null })}
        t={t}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('builder.name')} value={cvData.personal.name} onChange={v => cv.updatePersonal({ name: v })} placeholder="Abdullayev Jasur" required />
        <InputField label={t('builder.title_job')} value={cvData.personal.title} onChange={v => cv.updatePersonal({ title: v })} placeholder="Frontend Developer" />
        <InputField label={t('builder.email')} type="email" value={cvData.personal.email} onChange={v => cv.updatePersonal({ email: v })} placeholder="jasur@example.com" />
        <InputField label={t('builder.phone')} type="tel" value={cvData.personal.phone} onChange={v => cv.updatePersonal({ phone: v })} placeholder="+998 90 123 45 67" />
        <InputField label={t('builder.city')} value={cvData.personal.city} onChange={v => cv.updatePersonal({ city: v })} placeholder={t('builder.city')} />
        <InputField label={t('builder.country')} value={cvData.personal.country} onChange={v => cv.updatePersonal({ country: v })} placeholder="O'zbekiston" />
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">{t('builder.social')}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="LinkedIn" value={cvData.personal.linkedin} onChange={v => cv.updatePersonal({ linkedin: v })} placeholder="linkedin.com/in/jasur" />
          <InputField label="GitHub" value={cvData.personal.github} onChange={v => cv.updatePersonal({ github: v })} placeholder="github.com/jasur" />
          <InputField label="Telegram" value={cvData.personal.telegram} onChange={v => cv.updatePersonal({ telegram: v })} placeholder="@jasur" />
          <InputField label={t('builder.website')} value={cvData.personal.website} onChange={v => cv.updatePersonal({ website: v })} placeholder="jasur.uz" />
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-700">{t('builder.about')}</h3>
        <AIAssistant
          cvData={cvData}
          onBioGenerated={(bio) => cv.updateAbout(bio)}
        />
      </div>
      <TextareaField
        label=""
        value={cvData.about}
        onChange={(v) => cv.updateAbout(v)}
        placeholder={t('builder.about_placeholder')}
        rows={5}
      />
      <p className="text-xs text-gray-400">{cvData.about.length}/500 {t('builder.characters')}</p>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {cvData.experience.map((exp, idx) => (
        <div key={exp.id} className="card border border-gray-200 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-700 text-sm">#{idx + 1} {t('builder.experience_item')}</span>
            <button onClick={() => cv.removeExperience(exp.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
              {t('common.delete')} ×
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label={t('builder.company')} value={exp.company} onChange={v => cv.updateExperience({ id: exp.id, company: v })} placeholder="Google, Apple..." />
            <InputField label={t('builder.position')} value={exp.position} onChange={v => cv.updateExperience({ id: exp.id, position: v })} placeholder="Senior Developer" />
            <InputField label={t('builder.start_date')} type="month" value={exp.startDate} onChange={v => cv.updateExperience({ id: exp.id, startDate: v })} />
            {!exp.current && (
              <InputField label={t('builder.end_date')} type="month" value={exp.endDate} onChange={v => cv.updateExperience({ id: exp.id, endDate: v })} />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 mt-2 cursor-pointer">
            <input type="checkbox" checked={exp.current} onChange={e => cv.updateExperience({ id: exp.id, current: e.target.checked, endDate: '' })} className="rounded" />
            {t('builder.current_job')}
          </label>
          <div className="mt-3">
            <TextareaField label={t('builder.description')} value={exp.description} onChange={v => cv.updateExperience({ id: exp.id, description: v })} placeholder="Asosiy vazifalaringizni yozing..." />
          </div>
        </div>
      ))}
      <button onClick={cv.addExperience} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_experience')}
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {cvData.education.map((edu, idx) => (
        <div key={edu.id} className="card border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-700 text-sm">#{idx + 1} {t('builder.education_item')}</span>
            <button onClick={() => cv.removeEducation(edu.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
              {t('common.delete')} ×
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label={t('builder.school')} value={edu.school} onChange={v => cv.updateEducation({ id: edu.id, school: v })} placeholder="TATU, NUU..." />
            <InputField label={t('builder.degree')} value={edu.degree} onChange={v => cv.updateEducation({ id: edu.id, degree: v })} placeholder="Bakalavr, Magistr..." />
            <InputField label={t('builder.field')} value={edu.field} onChange={v => cv.updateEducation({ id: edu.id, field: v })} placeholder="Kompyuter muhandisligi" />
            <InputField label={t('builder.start_date')} type="month" value={edu.startDate} onChange={v => cv.updateEducation({ id: edu.id, startDate: v })} />
            {!edu.current && (
              <InputField label={t('builder.end_date')} type="month" value={edu.endDate} onChange={v => cv.updateEducation({ id: edu.id, endDate: v })} />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 mt-2 cursor-pointer">
            <input type="checkbox" checked={edu.current} onChange={e => cv.updateEducation({ id: edu.id, current: e.target.checked })} className="rounded" />
            {t('builder.current_education')}
          </label>
        </div>
      ))}
      <button onClick={cv.addEducation} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_education')}
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-3">
      <AIAssistant
        cvData={cvData}
        onSkillsGenerated={(skills) => skills.forEach(name => { cv.addSkill(); setTimeout(() => cv.updateSkill({ id: Date.now(), name, level: 80 }), 50); })}
      />
      {cvData.skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-3">
          <input
            type="text"
            value={skill.name}
            onChange={e => cv.updateSkill({ id: skill.id, name: e.target.value })}
            placeholder={t('builder.skill_name')}
            className="input-field flex-1"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <input
              type="range" min="10" max="100" step="5"
              value={skill.level}
              onChange={e => cv.updateSkill({ id: skill.id, level: Number(e.target.value) })}
              className="w-24"
            />
            <span className="text-sm text-gray-500 w-10 text-right">{skill.level}%</span>
          </div>
          <button onClick={() => cv.removeSkill(skill.id)} className="text-red-400 hover:text-red-600 text-lg leading-none transition-colors">×</button>
        </div>
      ))}
      <button onClick={cv.addSkill} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_skill')}
      </button>
    </div>
  );

  const LANG_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const renderLanguages = () => (
    <div className="space-y-3">
      {cvData.languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-3">
          <input
            type="text"
            value={lang.name}
            onChange={e => cv.updateLanguage({ id: lang.id, name: e.target.value })}
            placeholder={t('builder.language_name')}
            className="input-field flex-1"
          />
          <select
            value={lang.level}
            onChange={e => cv.updateLanguage({ id: lang.id, level: e.target.value })}
            className="input-field w-24 flex-shrink-0"
          >
            {LANG_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <button onClick={() => cv.removeLanguage(lang.id)} className="text-red-400 hover:text-red-600 text-lg leading-none transition-colors">×</button>
        </div>
      ))}
      <button onClick={cv.addLanguage} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_language')}
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {cvData.projects.map((proj, idx) => (
        <div key={proj.id} className="card border border-gray-200">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-gray-700 text-sm">#{idx + 1} {t('builder.project_item')}</span>
            <button onClick={() => cv.removeProject(proj.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">{t('common.delete')} ×</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label={t('builder.project_name')} value={proj.name} onChange={v => cv.updateProject({ id: proj.id, name: v })} placeholder="CVcraft, E-commerce..." />
            <InputField label={t('builder.project_tech')} value={proj.tech} onChange={v => cv.updateProject({ id: proj.id, tech: v })} placeholder="React, Node.js, Python..." />
            <div className="sm:col-span-2">
              <InputField label={t('builder.project_link')} value={proj.link} onChange={v => cv.updateProject({ id: proj.id, link: v })} placeholder="https://github.com/..." />
            </div>
            <div className="sm:col-span-2">
              <TextareaField label={t('builder.project_desc')} value={proj.description} onChange={v => cv.updateProject({ id: proj.id, description: v })} placeholder={t('builder.project_desc')} rows={2} />
            </div>
          </div>
        </div>
      ))}
      <button onClick={cv.addProject} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_project')}
      </button>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      {cvData.certificates.map((cert, idx) => (
        <div key={cert.id} className="card border border-gray-200">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-gray-700 text-sm">#{idx + 1} {t('builder.certificate_item')}</span>
            <button onClick={() => cv.removeCertificate(cert.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">{t('common.delete')} ×</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <InputField label={t('builder.cert_name')} value={cert.name} onChange={v => cv.updateCertificate({ id: cert.id, name: v })} placeholder="AWS Certified, IELTS..." />
            <InputField label={t('builder.cert_issuer')} value={cert.issuer} onChange={v => cv.updateCertificate({ id: cert.id, issuer: v })} placeholder="Amazon, British Council..." />
            <InputField label={t('builder.cert_date')} type="month" value={cert.date} onChange={v => cv.updateCertificate({ id: cert.id, date: v })} />
            <InputField label={t('builder.cert_link')} value={cert.link} onChange={v => cv.updateCertificate({ id: cert.id, link: v })} placeholder="https://..." />
          </div>
        </div>
      ))}
      <button onClick={cv.addCertificate} className="btn-secondary w-full flex items-center justify-center gap-2">
        <span className="text-lg">+</span> {t('builder.add_certificate')}
      </button>
    </div>
  );

  const stepRenderers = [renderPersonal, renderAbout, renderExperience, renderEducation, renderSkills, renderLanguages, renderProjects, renderCertificates];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PremiumModal />
      {/* Reklama — faqat bepul foydalanuvchilar uchun */}
      <AdBanner size="banner" className="mb-6" />
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar steps */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="card sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">{t('builder.sections_nav')}</h2>
            <nav className="space-y-1">
              {STEPS.map((step, i) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    currentStep === i
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-base ${
                    currentStep === i ? 'bg-blue-500 text-white shadow' : 'bg-gray-100'
                  }`}>
                    {stepIcons[i]}
                  </span>
                  {stepLabels[i]}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={handlePreview}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t('builder.preview')}
              </button>
            </div>
          </div>
          {/* Sidebar reklama */}
          <AdBanner size="rectangle" className="hidden lg:flex" />
        </div>

        {/* Main form area */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-xl shadow">
                {stepIcons[currentStep]}
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{stepLabels[currentStep]}</h2>
                <p className="text-sm text-gray-500">{currentStep + 1}/{STEPS.length} {t('builder.step_label')}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>

            {/* Step content */}
            <div className="animate-fade-in">
              {stepRenderers[currentStep]()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-40 flex items-center gap-2"
              >
                ← {t('builder.prev')}
              </button>
              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="btn-primary flex items-center gap-2"
                >
                  {t('builder.next')} →
                </button>
              ) : (
                <button onClick={handlePreview} className="btn-primary flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('preview.title')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
