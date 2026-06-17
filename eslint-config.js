/**
 * @niyi/ui/eslint-config — design-system guardrails (prevents the constellation
 * from re-drifting). Extend in each app's .eslintrc:
 *
 *   { "extends": ["next/core-web-vitals", "@niyi/ui/eslint-config"] }
 *
 * Rules are 'warn' for gradual adoption; escalate to 'error' (and keep ESLint on
 * during `next build`) once each app is clean, to make the build the gate.
 * For full raw-color/class bans, also add eslint-plugin-tailwindcss
 * (`no-custom-classname`) with the @niyi/ui preset.
 */
module.exports = {
  rules: {
    // No inline styles for color/layout — use @niyi/ui primitives + Tailwind tokens.
    // (Charts / runtime-computed dimensions are the legitimate exception.)
    'no-restricted-syntax': [
      'warn',
      {
        selector: "JSXAttribute[name.name='style']",
        message:
          'Avoid inline style={{}}; use @niyi/ui primitives + Tailwind semantic tokens. (Charts/computed dims excepted.)',
      },
    ],
    // Don't fork the shared primitives locally.
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: [
              '*/components/ui/Button',
              '*/components/ui/Card',
              '*/components/ui/Input',
              '*/components/ui/Badge',
            ],
            message: 'Import shared primitives from @niyi/ui, not a local copy.',
          },
        ],
      },
    ],
  },
}
