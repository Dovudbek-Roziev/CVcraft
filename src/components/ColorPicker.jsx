import React, { useState } from 'react';

const PRESET_COLORS = [
  '#3B82F6', '#1D4ED8', '#7C3AED', '#DB2777', '#DC2626',
  '#D97706', '#059669', '#0891B2', '#374151', '#1F2937',
  '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899',
];

export default function ColorPicker({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <label className="label">{label}</label>
      <div className="flex items-center gap-2">
        {/* Color preview button */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-10 h-10 rounded-xl border-2 border-gray-200 shadow-sm hover:scale-105 transition-transform"
          style={{ backgroundColor: value }}
          aria-label={label}
        />
        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field w-28 font-mono text-sm uppercase"
          maxLength={7}
        />
        {/* Native color input */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
      </div>

      {/* Preset colors popover */}
      {showPicker && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowPicker(false)} />
          <div className="absolute top-full left-0 mt-2 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
            <p className="text-xs text-gray-500 mb-2">Tayyor ranglar</p>
            <div className="grid grid-cols-5 gap-1.5">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => { onChange(color); setShowPicker(false); }}
                  className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${
                    value === color ? 'border-gray-800 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
