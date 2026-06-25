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
      colorScheme: 'light',
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
      // ─── Semantic neutral ramp (dark-mode aware) ──────────────────────────────
      // Cool slate-like neutrals as RGB triplets (so the `ground` Tailwind color can
      // take an <alpha-value>). The ramp INVERTS under `.dark` (50↔900 …) so a single
      // class like `bg-ground-50` / `text-ground-900` reads correctly in both modes
      // WITHOUT a per-app forked `--*-slate-*` remap. Migrating apps that hand-rolled
      // an inverted slate ramp should drop it and use `ground-*` (same values).
      '--ground-50': '248 250 252', '--ground-100': '241 245 249', '--ground-200': '226 232 240',
      '--ground-300': '203 213 225', '--ground-400': '148 163 184', '--ground-500': '100 116 139',
      '--ground-600': '71 85 105', '--ground-700': '51 65 85', '--ground-800': '30 41 59',
      '--ground-900': '15 23 42',
      // Semantic surface/ink singletons (also flip). Used by the var-backed
      // `surface` / `ink` / `muted` / `line` / `canvas` Tailwind colors below.
      '--surface': '#FFFFFF',          // card / raised surface
      '--surface-muted': '#F6F9FC',    // page / sunken surface
      '--ink': '#0A2540',              // primary text
      '--ink-muted': '#475569',        // secondary text
      '--line': '#E3E8EE',             // borders / dividers
      // Data-viz tokens — single source of truth for charts. Consume via the
      // var-backed `viz` Tailwind colors (stroke-viz-axis / fill-viz-pos / bg-viz-band)
      // for STATIC colors, or as `var(--viz-*)` strings inside `style={{}}` for
      // DATA-DRIVEN colors. NOTE: `var()` does NOT resolve in raw SVG presentation
      // attributes (`stroke="..."`) — only in CSS declarations (className/style).
      '--viz-1': '#0F766E', '--viz-2': '#0EA5E9', '--viz-3': '#14B8A6', '--viz-4': '#22C55E',
      '--viz-5': '#F59E0B', '--viz-6': '#64748B', '--viz-7': '#DC2626', '--viz-8': '#334155',
      '--viz-grid': '#F1F5F9',        // faint gridlines
      '--viz-axis': '#CBD5E1',        // axis / crosshair lines
      '--viz-line': '#0F172A',        // primary series ink
      '--viz-tooltip-bg': '#0F172A',  // tooltip pill
      '--viz-tooltip-fg': '#FFFFFF',
      '--viz-pos': '#10B981',         // good / in-range
      '--viz-warn': '#F59E0B',        // low / caution
      '--viz-neg': '#EF4444',         // high / bad
      '--viz-crit': '#7F1D1D',        // very-low (clinical, most severe)
      '--viz-high': '#C2410C',        // very-high (clinical)
      '--viz-thresh': '#FCD34D',      // dashed threshold lines
      '--viz-band': 'rgba(16,185,129,0.10)',        // shaded normal/target band
      '--viz-band-strong': 'rgba(16,185,129,0.35)', // band edge stroke
      '--viz-band-neutral': 'rgba(15,23,42,0.06)',  // neutral (min–max) band
      '--viz-nodata': 'rgba(148,163,184,0.15)',     // missing-data cells
    },
    '.dark': {
      colorScheme: 'dark',
      '--bg-primary': '#0A2540',
      '--bg-secondary': '#1E293B',
      '--bg-card': '#1E293B',
      '--text-primary': '#F6F9FC',
      '--text-secondary': '#94A3B8',
      '--border-color': '#334155',
      // Inverted neutral ramp for dark mode (50↔900, 100↔800 …) — matches the
      // per-app forked ramp this preset replaces.
      '--ground-50': '15 23 42', '--ground-100': '30 41 59', '--ground-200': '51 65 85',
      '--ground-300': '71 85 105', '--ground-400': '100 116 139', '--ground-500': '148 163 184',
      '--ground-600': '203 213 225', '--ground-700': '226 232 240', '--ground-800': '241 245 249',
      '--ground-900': '248 250 252',
      '--surface': '#1E293B',
      '--surface-muted': '#0A2540',
      '--ink': '#F6F9FC',
      '--ink-muted': '#94A3B8',
      '--line': '#334155',
      // Brightened so charts read on the dark card surface (#1E293B); tooltip flips
      // to a light pill, series ink flips to a light stroke.
      '--viz-1': '#2DD4BF', '--viz-2': '#38BDF8', '--viz-3': '#5EEAD4', '--viz-4': '#4ADE80',
      '--viz-5': '#FBBF24', '--viz-6': '#94A3B8', '--viz-7': '#F87171', '--viz-8': '#CBD5E1',
      '--viz-grid': '#334155',
      '--viz-axis': '#475569',
      '--viz-line': '#E2E8F0',
      '--viz-tooltip-bg': '#F1F5F9',
      '--viz-tooltip-fg': '#0A2540',
      '--viz-pos': '#34D399',
      '--viz-warn': '#FBBF24',
      '--viz-neg': '#F87171',
      '--viz-crit': '#DC2626',
      '--viz-high': '#FB923C',
      '--viz-thresh': '#FCD34D',
      '--viz-band': 'rgba(52,211,153,0.14)',
      '--viz-band-strong': 'rgba(52,211,153,0.40)',
      '--viz-band-neutral': 'rgba(226,232,240,0.08)',
      '--viz-nodata': 'rgba(148,163,184,0.18)',
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
    // Mobile grid safety net: any UNPREFIXED multi-column grid (grid-cols-3..6)
    // degrades to 2 columns below the `sm` breakpoint so pages stay usable on
    // phones (e.g. inside the Pulse mobile WebViews) even when a page didn't add
    // responsive prefixes. Responsive variants (sm:/md:/lg:grid-cols-*) generate
    // distinct classes and are untouched; 7+ col grids (calendars/heatmaps,
    // 12-col layouts) are intentionally left alone.
    '@media (max-width: 639px)': {
      '.grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr)) !important',
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

    // Mobile content-squeeze safety net (apps render at ~360px inside the Pulse WebViews).
    // Variant A — flex rows: `.responsive-row` stacks vertically on phones and becomes a
    // justify-between row at `sm`+, so a fixed-width right block (value/controls/badge) never
    // crushes the left label below the breakpoint. Drop-in for a hand-rolled
    // `flex items-start justify-between gap-4`. Add `.responsive-row-center` for desktop
    // vertical-centering. Each direct child should still carry `min-w-0` if it truncates.
    '.responsive-row': { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    '@media (min-width: 640px)': {
      '.responsive-row': { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' },
      '.responsive-row-center': { alignItems: 'center' },
    },
    // Variant B — wide tables: `.table-scroll` lets the table scroll horizontally instead of
    // compressing columns to ~1 char on a phone. The nested table keeps a sensible min width
    // (override via `--table-min`, e.g. style={{ ['--table-min']: '32rem' }} for narrow tables).
    '.table-scroll': { overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
    '.table-scroll > table': { minWidth: 'var(--table-min, 40rem)' },
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
        // Var-backed so chart utilities (stroke-viz-*, fill-viz-*, bg-viz-*) flip in
        // dark mode automatically. Values defined in the plugin :root/.dark above.
        viz: {
          1: 'var(--viz-1)', 2: 'var(--viz-2)', 3: 'var(--viz-3)', 4: 'var(--viz-4)',
          5: 'var(--viz-5)', 6: 'var(--viz-6)', 7: 'var(--viz-7)', 8: 'var(--viz-8)',
          grid: 'var(--viz-grid)', axis: 'var(--viz-axis)', line: 'var(--viz-line)',
          tooltip: 'var(--viz-tooltip-bg)', 'tooltip-fg': 'var(--viz-tooltip-fg)',
          pos: 'var(--viz-pos)', warn: 'var(--viz-warn)', neg: 'var(--viz-neg)',
          crit: 'var(--viz-crit)', high: 'var(--viz-high)', thresh: 'var(--viz-thresh)',
          band: 'var(--viz-band)', 'band-strong': 'var(--viz-band-strong)',
          'band-neutral': 'var(--viz-band-neutral)', nodata: 'var(--viz-nodata)',
        },
        // Dark-mode-aware neutral ramp. RGB triplets (→ <alpha-value> support) that
        // INVERT under `.dark`, so `bg-ground-50` / `text-ground-900` / `border-ground-200`
        // read correctly in both modes from ONE class. Replaces per-app forked
        // `--*-slate-*` ramps. Values defined in the plugin :root/.dark above.
        ground: {
          50: 'rgb(var(--ground-50) / <alpha-value>)',
          100: 'rgb(var(--ground-100) / <alpha-value>)',
          200: 'rgb(var(--ground-200) / <alpha-value>)',
          300: 'rgb(var(--ground-300) / <alpha-value>)',
          400: 'rgb(var(--ground-400) / <alpha-value>)',
          500: 'rgb(var(--ground-500) / <alpha-value>)',
          600: 'rgb(var(--ground-600) / <alpha-value>)',
          700: 'rgb(var(--ground-700) / <alpha-value>)',
          800: 'rgb(var(--ground-800) / <alpha-value>)',
          900: 'rgb(var(--ground-900) / <alpha-value>)',
        },
        // Semantic aliases → CSS variables (set in the plugin :root/.dark). Prefer in new code.
        // All flip in dark mode. `surface`/`surface-muted` = backgrounds, `ink`/`muted` = text,
        // `line` = borders. `canvas` kept as an alias for the page background.
        canvas: 'var(--surface-muted)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
        },
        muted: 'var(--ink-muted)',
        line: 'var(--line)',
        // Chart / data-viz semantic colors → the same var-backed values as `viz` (single
        // source of truth in :root/.dark), exposed under the `chart` name the external
        // review asked for. Use `bg-chart-primary` / `text-chart-success` etc. for STATIC
        // colors; they flip in dark mode automatically. (For data-driven SVG fills, read
        // the `var(--viz-*)` strings directly — see the viz note above.)
        chart: {
          primary: 'var(--viz-1)', secondary: 'var(--viz-2)', tertiary: 'var(--viz-3)',
          1: 'var(--viz-1)', 2: 'var(--viz-2)', 3: 'var(--viz-3)', 4: 'var(--viz-4)',
          5: 'var(--viz-5)', 6: 'var(--viz-6)', 7: 'var(--viz-7)', 8: 'var(--viz-8)',
          grid: 'var(--viz-grid)', axis: 'var(--viz-axis)', line: 'var(--viz-line)',
          tooltip: 'var(--viz-tooltip-bg)', 'tooltip-fg': 'var(--viz-tooltip-fg)',
          success: 'var(--viz-pos)', pos: 'var(--viz-pos)',
          warning: 'var(--viz-warn)', warn: 'var(--viz-warn)',
          danger: 'var(--viz-neg)', neg: 'var(--viz-neg)',
          crit: 'var(--viz-crit)', high: 'var(--viz-high)', thresh: 'var(--viz-thresh)',
          band: 'var(--viz-band)', 'band-strong': 'var(--viz-band-strong)',
          'band-neutral': 'var(--viz-band-neutral)', nodata: 'var(--viz-nodata)',
        },
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
        // Skeleton shimmer: a soft highlight sweeps across the placeholder (Skeleton overlay).
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        fadeUp: 'fadeUp 0.5s cubic-bezier(0.2,0,0,1) both',
        slideDown: 'slideDown 180ms cubic-bezier(0.2,0,0,1)',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [cssVars],
}
