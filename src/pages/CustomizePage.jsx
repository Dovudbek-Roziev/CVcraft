import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../components/ColorPicker.jsx';
import FontSelector from '../components/FontSelector.jsx';
import { useCV } from '../hooks/useCV.js';

const SKILL_STYLES = [
  { id: 'linear', key: 'skill_linear', preview: '━━━━━━░░' },
  { id: 'circle', key: 'skill_circle', preview: '◕' },
  { id: 'dots', key: 'skill_dots', preview: '●●●●○' },
  { id: 'stars', key: 'skill_stars', preview: '★★★★☆' },
];

const LAYOUTS = [
  { id: 'single', key: 'layout_single', icon: '▌' },
  { id: 'double', key: 'layout_double', icon: '▌▐' },
];

export default function CustomizePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cvData, updateCustomization, reorderSections } = useCV();
  const { customization } = cvData;
  const [activeTab, setActiveTab] = useState('color');
  const sections = customization.sectionOrder || ['about', 'experience', 'education', 'skills', 'languages', 'projects', 'certificates'];

  const tabs = [
    { id: 'color', label: t('customize.tab_color') },
    { id: 'font', label: t('customize.tab_font') },
    { id: 'layout', label: t('customize.tab_layout') },
    { id: 'skills', label: t('customize.tab_skills') },
    { id: 'sections', label: t('customize.tab_sections') },
  ];

  const sectionLabels = {
    about: t('builder.about'),
    experience: t('builder.experience'),
    education: t('builder.education'),
    skills: t('builder.skills'),
    languages: t('builder.languages'),
    projects: t('builder.projects'),
    certificates: t('builder.certificates'),
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(sections);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    reorderSections(newOrder);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('customize.title')}</h1>
        <p className="text-gray-600">{t('customize.subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300'}`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="card">
            {activeTab === 'color' && (
              <div>
                <h3 className="mb-4 font-semibold text-gray-800">{t('customize.primary_label')}</h3>
                <ColorPicker value={customization.primaryColor || '#3B82F6'} onChange={(color) => updateCustomization({ primaryColor: color })} />
                <div className="mt-6">
                  <h3 className="mb-4 font-semibold text-gray-800">{t('customize.bg_label')}</h3>
                  <ColorPicker value={customization.bgColor || '#FFFFFF'} onChange={(color) => updateCustomization({ bgColor: color })} />
                </div>
              </div>
            )}

            {activeTab === 'font' && (
              <div>
                <h3 className="mb-4 font-semibold text-gray-800">{t('customize.font_label')}</h3>
                <FontSelector value={customization.font || 'Inter'} onChange={(font) => updateCustomization({ font })} />
              </div>
            )}

            {activeTab === 'layout' && (
              <div>
                <h3 className="mb-4 font-semibold text-gray-800">{t('customize.layout_label')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => updateCustomization({ layout: layout.id })}
                      className={`rounded-xl border-2 p-6 text-center transition-all ${(customization.layout || 'single') === layout.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      type="button"
                    >
                      <div className="mb-2 font-mono text-3xl">{layout.icon}</div>
                      <div className="font-medium text-gray-800">{t(`customize.${layout.key}`)}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="mb-3 font-semibold text-gray-800">{t('customize.font_size_label')}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{t('customize.small')}</span>
                    <input type="range" min="12" max="16" step="1" value={customization.fontSize || 14} onChange={(e) => updateCustomization({ fontSize: Number(e.target.value) })} className="flex-1" />
                    <span className="text-sm text-gray-500">{t('customize.large')}</span>
                    <span className="w-8 text-sm font-semibold text-blue-600">{customization.fontSize || 14}px</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-3 font-semibold text-gray-800">{t('customize.spacing_label')}</h3>
                  <div className="flex gap-3">
                    {['compact', 'normal', 'spacious'].map((spacing) => (
                      <button
                        key={spacing}
                        onClick={() => updateCustomization({ spacing })}
                        className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${(customization.spacing || 'normal') === spacing ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        type="button"
                      >
                        {t(`customize.${spacing}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h3 className="mb-4 font-semibold text-gray-800">{t('customize.skill_style_label')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SKILL_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateCustomization({ skillStyle: style.id })}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${(customization.skillStyle || 'linear') === style.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      type="button"
                    >
                      <div className="mb-1 text-lg">{style.preview}</div>
                      <div className="text-sm font-medium text-gray-800">{t(`customize.${style.key}`)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <div>
                <h3 className="mb-2 font-semibold text-gray-800">{t('customize.sections_order')}</h3>
                <p className="mb-4 text-sm text-gray-500">{t('customize.sections_drag')}</p>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {sections.map((sectionId, index) => (
                          <Draggable key={sectionId} draggableId={sectionId} index={index}>
                            {(dragProvided, snapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                className={`flex items-center gap-3 rounded-xl border bg-white p-3 transition-all ${snapshot.isDragging ? 'border-blue-300 shadow-lg' : 'border-gray-200'}`}
                              >
                                <div {...dragProvided.dragHandleProps} className="cursor-grab text-gray-400">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{sectionLabels[sectionId] || sectionId}</span>
                                <span className="ml-auto text-xs text-gray-400">#{index + 1}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="sticky top-24">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">{t('customize.preview_label')}</h3>
            <div className="aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex h-1/3 items-center justify-center" style={{ backgroundColor: customization.primaryColor || '#3B82F6' }}>
                <div className="text-center text-white">
                  <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-sm font-bold">
                    {cvData.personal.firstName?.[0] || 'J'}{cvData.personal.lastName?.[0] || 'D'}
                  </div>
                  <div className="text-sm font-bold">{cvData.personal.firstName || t('builder.name')}</div>
                  <div className="text-xs opacity-80">{cvData.personal.jobTitle || t('builder.title_job')}</div>
                </div>
              </div>
              <div className="space-y-2 p-3" style={{ fontFamily: customization.font || 'Inter' }}>
                {[70, 85, 60, 90, 75].map((width, index) => (
                  <div key={index} className="h-1.5 rounded-full" style={{ width: `${width}%`, backgroundColor: (customization.primaryColor || '#3B82F6') + '40' }} />
                ))}
              </div>
            </div>
            <button onClick={() => navigate('/preview')} className="btn-primary mt-4 w-full text-sm" type="button">
              {t('customize.view_preview')}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={() => navigate('/templates')} className="btn-secondary" type="button">
          {t('customize.back_templates')}
        </button>
        <button onClick={() => navigate('/preview')} className="btn-primary" type="button">
          {t('customize.view_preview')}
        </button>
      </div>
    </div>
  );
}
