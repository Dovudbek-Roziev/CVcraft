import i18n from '../i18n';

const labels = {
  about: { uz: 'Haqida', ru: 'Обо мне', en: 'About' },
  contact: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
  experience: { uz: 'Ish tajribasi', ru: 'Опыт работы', en: 'Work Experience' },
  shortExperience: { uz: 'Tajriba', ru: 'Опыт', en: 'Experience' },
  education: { uz: "Ta'lim", ru: 'Образование', en: 'Education' },
  skills: { uz: "Ko'nikmalar", ru: 'Навыки', en: 'Skills' },
  languages: { uz: 'Tillar', ru: 'Языки', en: 'Languages' },
  projects: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' },
  portfolioProjects: { uz: 'Portfolio / Loyihalar', ru: 'Портфолио / Проекты', en: 'Portfolio / Projects' },
  certificates: { uz: 'Sertifikatlar', ru: 'Сертификаты', en: 'Certificates' },
  present: { uz: 'Hozir', ru: 'Сейчас', en: 'Present' },
  professionalSummary: { uz: 'Kasbiy xulosa', ru: 'Профессиональное резюме', en: 'Professional Summary' },
  academicSummary: { uz: 'Ilmiy xulosa', ru: 'Научное резюме', en: 'Research Summary' },
  academicExperience: { uz: 'Ilmiy va kasbiy tajriba', ru: 'Научный и профессиональный опыт', en: 'Academic & Professional Experience' },
  researchProjects: { uz: 'Tadqiqot va loyihalar', ru: 'Исследования и проекты', en: 'Research & Projects' },
  executiveExperience: { uz: 'Rahbarlik tajribasi', ru: 'Руководящий опыт', en: 'Executive Experience' },
  keyProjects: { uz: 'Asosiy loyihalar', ru: 'Ключевые проекты', en: 'Key Projects' },
  legalStatement: { uz: 'Kasbiy bayonot', ru: 'Профессиональное заявление', en: 'Professional Statement' },
  legalExperience: { uz: 'Huquqiy tajriba', ru: 'Юридический опыт', en: 'Legal Experience' },
  legalEducation: { uz: "Huquqiy ta'lim", ru: 'Юридическое образование', en: 'Legal Education' },
  practiceAreas: { uz: "Amaliy yo'nalishlar", ru: 'Практические области', en: 'Practice Areas' },
  campaignExperience: { uz: 'Kampaniya tajribasi', ru: 'Опыт кампаний', en: 'Campaign Experience' },
  marketingSkills: { uz: "Marketing ko'nikmalari", ru: 'Маркетинговые навыки', en: 'Marketing Skills' },
  clinicalExperience: { uz: 'Klinik tajriba', ru: 'Клинический опыт', en: 'Clinical Experience' },
  medicalEducation: { uz: "Tibbiy ta'lim", ru: 'Медицинское образование', en: 'Medical Education' },
  researchPublications: { uz: 'Tadqiqot va nashrlar', ru: 'Исследования и публикации', en: 'Research & Publications' },
  clinicalSkills: { uz: "Klinik ko'nikmalar", ru: 'Клинические навыки', en: 'Clinical Skills' },
  licenses: { uz: 'Sertifikatlar va litsenziyalar', ru: 'Сертификаты и лицензии', en: 'Certifications & Licenses' },
};

export function cvLabel(key) {
  const language = i18n.language?.split('-')[0] || 'uz';
  return labels[key]?.[language] || labels[key]?.uz || key;
}
