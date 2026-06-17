/**
 * @niyi/ui — shared Tailwind preset. Single source of truth for design tokens.
 * Apps consume it via `presets: [require('@niyi/ui/tailwind-preset')]` and must add
 * './node_modules/@niyi/ui/dist/**/*.js' to their `content` globs.
 *
 * Raw scales (primary/neutral/success/warning/error/viz) back the system; the
 * `semantic` color aliases map to CSS variables (defined in styles.css :root/.dark)
 * so light/dark and per-app theming are a variable swap, not a code change.
 */
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
        // Semantic aliases → CSS variables (styles.css). Prefer these in new/migrated code.
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
    },
  },
  plugins: [],
}
