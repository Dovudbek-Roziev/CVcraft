import React from 'react';

const FONTS = [
  { name: 'Inter', label: 'Inter', category: 'Sans-serif' },
  { name: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { name: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
  { name: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { name: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  { name: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
  { name: 'Raleway', label: 'Raleway', category: 'Sans-serif' },
  { name: 'Nunito', label: 'Nunito', category: 'Sans-serif' },
  { name: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', label: 'Merriweather', category: 'Serif' },
];

export default function FontSelector({ value, onChange, label = 'Shrift' }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {FONTS.map(font => (
          <button
            key={font.name}
            onClick={() => onChange(font.name)}
            className={`px-3 py-2.5 rounded-xl border-2 text-sm text-left transition-all ${
              value === font.name
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
            style={{ fontFamily: font.name }}
          >
            <div className="font-semibold">{font.label}</div>
            <div className="text-xs opacity-60">{font.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
