import React from 'react';

// Linear progress bar skill
function LinearBar({ level, color = '#3B82F6' }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${level}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Circle skill indicator
function CircleBar({ level, color = '#3B82F6' }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle
        cx="22" cy="22" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
      />
      <text x="22" y="26" textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">
        {level}%
      </text>
    </svg>
  );
}

// Dot-style skill level (5 dots)
function DotsBar({ level, color = '#3B82F6' }) {
  const filled = Math.round((level / 100) * 5);
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full border-2 transition-all"
          style={{
            backgroundColor: i < filled ? color : 'transparent',
            borderColor: color,
          }}
        />
      ))}
    </div>
  );
}

// Stars skill level (5 stars)
function StarsBar({ level, color = '#3B82F6' }) {
  const filled = Math.round((level / 100) * 5);
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={i < filled ? color : 'none'} stroke={color} strokeWidth="1.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SkillBar({ level = 80, style = 'linear', color = '#3B82F6' }) {
  switch (style) {
    case 'circle': return <CircleBar level={level} color={color} />;
    case 'dots': return <DotsBar level={level} color={color} />;
    case 'stars': return <StarsBar level={level} color={color} />;
    default: return <LinearBar level={level} color={color} />;
  }
}
