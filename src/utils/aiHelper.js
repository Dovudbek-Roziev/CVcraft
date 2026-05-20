// AI helper – generates suggestions using simple templates.
// In production, replace with real Claude API calls.

const bioTemplates = {
  developer: [
    "Tajribali dasturchi bo'lib, {years} yildan ortiq tajribaga egaman. Murakkab muammolarni hal qilish va sifatli kod yozishga ixtisoslashganman.",
    "Frontend/Backend ishlab chiqaruvchi sifatida zamonaviy texnologiyalardan foydalangan holda foydalanuvchilar uchun qulay ilovalar yarataman.",
  ],
  designer: [
    "Ijodkor UI/UX dizayner bo'lib, foydalanuvchi tajribasini yaxshilashga ixtisoslashganman. Chiroyli va funksional dizaynlar yaratishni sevaman.",
    "Grafik dizayner sifatida brend identifikatsiyasi va raqamli dizayn loyihalarida katta tajribaga egaman.",
  ],
  manager: [
    "Jamoani boshqarish va loyihalarni muvaffaqiyatli yakunlash bo'yicha kuchli tajribaga ega menejerman.",
    "Strategik fikrlash va natijaga yo'naltirilgan yondashuv bilan jamoalarni maqsad sari eltaman.",
  ],
  default: [
    "Professional mutaxassis sifatida o'z sohamda kuchli bilim va tajribaga egaman. Yangi narsalarni o'rganishga va jamoa bilan ishlashga ishtiyoqmanman.",
    "Mas'uliyatli va mehnatsevar mutaxassis bo'lib, doim sifat va professional o'sishga intilaman.",
  ],
};

const skillSuggestions = {
  developer: ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'SQL', 'Docker', 'REST API', 'TypeScript', 'HTML/CSS'],
  designer: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch', 'Prototyping', 'UI Design', 'UX Research', 'After Effects'],
  manager: ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Strategic Planning', 'Budgeting', 'Team Building', 'Risk Management'],
  marketer: ['SEO/SEM', 'Google Analytics', 'Content Marketing', 'Social Media', 'Email Marketing', 'CRM', 'Data Analysis', 'Copywriting'],
  default: ['MS Office', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Critical Thinking', 'Adaptability'],
};

function detectRole(title = '') {
  const t = title.toLowerCase();
  if (t.includes('developer') || t.includes('dasturchi') || t.includes('programmer') || t.includes('engineer')) return 'developer';
  if (t.includes('designer') || t.includes('dizayner') || t.includes('ui') || t.includes('ux')) return 'designer';
  if (t.includes('manager') || t.includes('director') || t.includes('menejer') || t.includes('boss')) return 'manager';
  if (t.includes('market') || t.includes('marketing')) return 'marketer';
  return 'default';
}

// Simulate async AI call
async function simulateAI(ms = 1200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateBio(cvData) {
  await simulateAI(1000);
  const role = detectRole(cvData.personal?.title);
  const templates = bioTemplates[role] || bioTemplates.default;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const years = cvData.experience?.length > 0 ? cvData.experience.length + 2 : 3;
  return template.replace('{years}', years);
}

export async function improveExperience(description) {
  await simulateAI(800);
  if (!description || description.length < 10) {
    return "Bu lavozimda mas'ul bo'lgan asosiy vazifalarni muvaffaqiyatli bajardim. Jamoaviy ishlash, muddatlarga rioya qilish va sifatli natijalar ko'rsatish bo'yicha kuchli tajriba orttirdim.";
  }
  return description + "\n\n• Natijalarni o'z vaqtida yetkazib berdim\n• Jamoaviy muhitda samarali ishladim\n• Yangi texnologiyalar va yondashuvlarni joriy etdim";
}

export async function suggestSkills(cvData) {
  await simulateAI(600);
  const role = detectRole(cvData.personal?.title);
  const skills = skillSuggestions[role] || skillSuggestions.default;
  const existingSkillNames = (cvData.skills || []).map(s => s.name.toLowerCase());
  return skills.filter(s => !existingSkillNames.includes(s.toLowerCase())).slice(0, 6);
}
