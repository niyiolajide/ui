/**
 * @niyi/ui — shared Tailwind preset. Single source of truth for design tokens AND
 * the base/component layer (shipped as a Tailwind plugin so it's processed natively
 * by each app — no CSS @import / postcss-import needed).
 *
 * Apps consume it via `presets: [require('@niyi/ui/tailwind-preset')]` and must also
 * add the compiled package dist (node_modules/@niyi/ui/dist) to their `content` globs.
 */
const plugin = require('tailwindcss/plugin')

const cssVars = plugin(({ addBase, addComponents }) => {
  addBase({
    ':root': {
      '--motion-fast': '120ms',
      '--motion-base': '180ms',
      '--motion-slow': '260ms',
      '--motion-ease-standard': 'cubic-bezier(0.2, 0, 0, 1)',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#F6F9FC',
      '--bg-card': '#FFFFFF',
      '--text-primary': '#0A2540',
      '--text-secondary': '#475569',
      '--border-color': '#E3E8EE',
    },
    '.dark': {
      '--bg-primary': '#0A2540',
      '--bg-secondary': '#1E293B',
      '--bg-card': '#1E293B',
      '--text-primary': '#F6F9FC',
      '--text-secondary': '#94A3B8',
      '--border-color': '#334155',
    },
    '*': { borderColor: '#E3E8EE' },
    '.dark *': { borderColor: '#334155' },
    body: { backgroundColor: '#F6F9FC', color: '#0A2540', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
    '.dark body': { backgroundColor: '#0A2540', color: '#F6F9FC' },
    ':where(a,button,input,select,textarea,[role="button"],[role="tab"],[tabindex]:not([tabindex="-1"])):focus-visible': {
      outline: 'none',
      boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #14B8A6',
    },
    '.dark :where(a,button,input,select,textarea,[role="button"],[role="tab"],[tabindex]:not([tabindex="-1"])):focus-visible': {
      boxShadow: '0 0 0 2px #0A2540, 0 0 0 4px #14B8A6',
    },
    'h1, h2, h3': { fontFamily: 'var(--font-display), Georgia, serif', fontWeight: '400' },
    'h4, h5, h6': { fontWeight: '600' },
    '@media (prefers-reduced-motion: reduce)': {
      '*': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
        scrollBehavior: 'auto !important',
      },
    },
  })

  addComponents({
    // Typography
    '.page-title': { fontSize: '1.5rem', lineHeight: '2rem', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: '400', letterSpacing: '-0.025em', color: '#0A2540' },
    '.dark .page-title': { color: '#F6F9FC' },
    '.page-subtitle': { fontSize: '0.875rem', lineHeight: '1.25rem', color: '#475569' },
    '.dark .page-subtitle': { color: '#94A3B8' },
    '.section-title': { fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '600', color: '#0A2540' },
    '.dark .section-title': { color: '#F6F9FC' },
    '.section-title-lg': { fontSize: '1.25rem', lineHeight: '1.75rem', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: '400', color: '#0A2540' },
    '.dark .section-title-lg': { color: '#F6F9FC' },
    '.metric-value': { fontSize: '1.875rem', lineHeight: '2.25rem', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: '400', fontVariantNumeric: 'tabular-nums', color: '#0A2540' },
    '.dark .metric-value': { color: '#F6F9FC' },
    '.metric-value-lg': { fontSize: '2.25rem', lineHeight: '2.5rem', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: '400', fontVariantNumeric: 'tabular-nums' },
    '.meta-label, .table-header': { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' },
    '.dark .meta-label, .dark .table-header': { color: '#94A3B8' },

    // Buttons
    '.btn': {
      paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.625rem', paddingBottom: '0.625rem',
      borderRadius: '0.5rem', fontWeight: '500',
      transitionProperty: 'all', transitionDuration: 'var(--motion-fast)', transitionTimingFunction: 'var(--motion-ease-standard)',
    },
    '.btn:focus-visible': { outline: 'none', boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #14B8A6' },
    '.dark .btn:focus-visible': { boxShadow: '0 0 0 2px #0A2540, 0 0 0 4px #14B8A6' },
    '.btn-primary': { backgroundColor: '#0F766E', color: '#FFFFFF', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    '.btn-primary:hover': { backgroundColor: '#115E59' },
    '.btn-secondary': { backgroundColor: '#FFFFFF', color: '#115E59', border: '1px solid #5EEAD4' },
    '.btn-secondary:hover': { backgroundColor: '#F0FDFA' },
    '.dark .btn-secondary': { backgroundColor: '#1E293B', color: '#5EEAD4', borderColor: '#115E59' },
    '.dark .btn-secondary:hover': { backgroundColor: '#334155' },
    '.btn-danger': { backgroundColor: '#DC2626', color: '#FFFFFF' },
    '.btn-danger:hover': { backgroundColor: '#B91C1C' },

    // Cards
    '.card': {
      backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E3E8EE',
      boxShadow: '0 1px 2px rgba(15,23,42,0.08), 0 1px 1px rgba(15,23,42,0.04)', padding: '1.5rem',
      transitionProperty: 'all', transitionDuration: 'var(--motion-base)', transitionTimingFunction: 'var(--motion-ease-standard)',
    },
    '.dark .card': { backgroundColor: '#1E293B', borderColor: '#334155' },
    '.card-hover:hover': { boxShadow: '0 4px 14px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.08)', transform: 'translateY(-0.125rem)' },

    // Inputs
    '.input': {
      width: '100%', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem',
      border: '1px solid #E3E8EE', borderRadius: '0.5rem', backgroundColor: '#FFFFFF', color: '#0A2540',
    },
    '.input::placeholder': { color: '#94A3B8' },
    '.input:focus': { outline: 'none', boxShadow: '0 0 0 2px #14B8A6', borderColor: 'transparent' },
    '.dark .input': { borderColor: '#334155', backgroundColor: '#1E293B', color: '#F6F9FC' },
    '.input-error': { borderColor: '#EF4444' },
    '.input-error:focus': { boxShadow: '0 0 0 2px #EF4444' },

    // Label
    '.label': { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.375rem' },
    '.dark .label': { color: '#CBD5E1' },

    // Badges
    '.badge': { display: 'inline-flex', alignItems: 'center', paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' },
    '.badge-success': { backgroundColor: '#ECFDF3', color: '#047857' },
    '.dark .badge-success': { backgroundColor: 'rgba(6,78,59,0.3)', color: '#34D399' },
    '.badge-warning': { backgroundColor: '#FFFBEB', color: '#B45309' },
    '.dark .badge-warning': { backgroundColor: 'rgba(120,53,15,0.3)', color: '#FBBF24' },
    '.badge-error': { backgroundColor: '#FEF2F2', color: '#B91C1C' },
    '.dark .badge-error': { backgroundColor: 'rgba(127,29,29,0.3)', color: '#F87171' },
    '.badge-neutral': { backgroundColor: '#F1F5F9', color: '#475569' },
    '.dark .badge-neutral': { backgroundColor: '#334155', color: '#CBD5E1' },
    '.badge-info': { backgroundColor: '#F0FDFA', color: '#115E59' },
    '.dark .badge-info': { backgroundColor: 'rgba(4,47,46,0.3)', color: '#2DD4BF' },

    // Utilities used by components / app code
    '.text-balance': { textWrap: 'balance' },
    '.tabular-nums': { fontVariantNumeric: 'tabular-nums' },
    '.scrollbar-hide': { msOverflowStyle: 'none', scrollbarWidth: 'none' },
    '.scrollbar-hide::-webkit-scrollbar': { display: 'none' },
    '.motion-fast': { transitionDuration: 'var(--motion-fast)', transitionTimingFunction: 'var(--motion-ease-standard)' },
    '.motion-base': { transitionDuration: 'var(--motion-base)', transitionTimingFunction: 'var(--motion-ease-standard)' },
    '.motion-slow': { transitionDuration: 'var(--motion-slow)', transitionTimingFunction: 'var(--motion-ease-standard)' },
  })
})

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4', 300: '#5EEAD4', 400: '#2DD4BF',
          500: '#14B8A6', 600: '#0F766E', 700: '#115E59', 800: '#134E4A', 900: '#042F2E', 950: '#021A19',
        },
        success: {
          50: '#ECFDF3', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7', 400: '#34D399',
          500: '#10B981', 600: '#059669', 700: '#047857', 800: '#065F46', 900: '#064E3B', 950: '#022C22',
        },
        warning: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D', 400: '#FBBF24',
          500: '#F59E0B', 600: '#D97706', 700: '#B45309', 800: '#92400E', 900: '#78350F', 950: '#451A03',
        },
        error: {
          50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5', 400: '#F87171',
          500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A',
        },
        neutral: {
          0: '#FFFFFF', 50: '#F6F9FC', 100: '#F1F5F9', 200: '#E3E8EE', 300: '#CBD5E1', 400: '#94A3B8',
          500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0A2540',
        },
        viz: {
          1: '#0F766E', 2: '#0EA5E9', 3: '#14B8A6', 4: '#22C55E', 5: '#F59E0B', 6: '#64748B', 7: '#DC2626', 8: '#334155',
        },
        // Semantic aliases → CSS variables (set in the plugin :root/.dark). Prefer in new code.
        canvas: 'var(--bg-secondary)',
        surface: 'var(--bg-card)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        line: 'var(--border-color)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        display: ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['30px', { lineHeight: '1.2', fontWeight: '700' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.08), 0 1px 1px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 14px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.08)',
        elevated: '0 12px 24px rgba(15,23,42,0.16), 0 4px 10px rgba(15,23,42,0.10)',
      },
      borderRadius: { card: '12px' },
      spacing: { 18: '4.5rem', 88: '22rem' },
      keyframes: {
        shake: { '0%, 100%': { transform: 'translateX(0)' }, '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' }, '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        fadeUp: 'fadeUp 0.5s cubic-bezier(0.2,0,0,1) both',
        slideDown: 'slideDown 180ms cubic-bezier(0.2,0,0,1)',
      },
    },
  },
  plugins: [cssVars],
}
