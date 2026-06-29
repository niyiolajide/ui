/**
 * @niyi/ui/eslint-config — legacy compatibility wrapper for the design-system
 * guardrails. The shared source of truth now lives in @niyi/platform/eslint/*.
 * Extend this only from legacy .eslintrc consumers:
 *
 *   { "extends": ["next/core-web-vitals", "@niyi/ui/eslint-config"] }
 *
 * Rules are errors to preserve the original guardrail intent under the stricter
 * platform policy. New flat-config consumers should import @niyi/platform/eslint.
 * For full raw-color/class bans, also add eslint-plugin-tailwindcss
 * (`no-custom-classname`) with the @niyi/ui preset.
 */
module.exports = {
  rules: {
    // No inline styles for color/layout — use @niyi/ui primitives + Tailwind tokens.
    // (Charts / runtime-computed dimensions are the legitimate exception.)
    'no-restricted-syntax': [
      'error',
      {
        selector: "JSXAttribute[name.name='style']",
        message:
          'Avoid inline style={{}}; use @niyi/ui primitives + Tailwind semantic tokens. (Charts/computed dims excepted.)',
      },
    ],
    // Don't fork the shared primitives locally.
    'no-restricted-imports': [
      'error',
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
