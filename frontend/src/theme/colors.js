// Centralized theme colors for the application.
// Primary accent updated from previous yellows (#fbbf24 / #f59e0b etc.) to new deep shade (RGB 34,4,56 => #220438).
// Provide a small tonal scale and utility gradients to avoid scattering raw hex values across components.

export const colors = {
  accent: '#220438',              // Primary brand accent
  accentStrong: '#32075A',        // Slightly brighter/deeper variant for gradients / hovers
  accentSoft: '#3E1170',          // Mid tone for secondary fills
  accentTint: '#5A2D8A',          // Lighter tint for subtle backgrounds
  accentGlow: 'rgba(34,4,56,0.4)',// Glow / shadow usage
  dark: '#0f172a',                // Existing dark neutral
  darkAlt: '#1e293b',
  grayText: '#64748b',
  grayMid: '#475569',
  white: '#ffffff'
};

export const gradients = {
  accentLinear: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentStrong} 100%)`,
  accentLinearAlt: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.accentSoft} 50%, ${colors.accentStrong} 100%)`,
  accentRadialSoft: `radial-gradient(circle at 30% 20%, ${colors.accentGlow}, transparent 60%)`,
  accentText: `linear-gradient(120deg, ${colors.white} 0%, ${colors.grayText} 35%, ${colors.accent} 90%)`,
  // Replacement for prior warm gold CTA background
  ctaPill: `linear-gradient(135deg, ${colors.accentTint} 0%, ${colors.accentSoft} 100%)`
};

export const shadows = {
  accentStrong: '0 8px 25px rgba(34,4,56,0.35)',
  accentMedium: '0 4px 18px rgba(34,4,56,0.25)',
  accentSoft: '0 2px 10px rgba(34,4,56,0.15)'
};

// Helper to swap legacy yellows if any inline dynamic usage persists (defensive fallback)
export const replaceLegacyYellow = (value = '') => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/#fbbf24/gi, colors.accent)
    .replace(/#f59e0b/gi, colors.accentStrong)
    .replace(/#fde68a/gi, colors.accentTint)
    .replace(/#fef3c7/gi, colors.accentTint)
    .replace(/#fefce8/gi, colors.accentTint);
};
