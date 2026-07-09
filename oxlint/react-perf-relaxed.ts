import { defineConfig } from 'oxlint';

// Enables the `react-perf` plugin with custom rules.
// Severities come from the categories declared in `all` when you compose them via `extends`.
// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  plugins: ['react-perf'],
  rules: {
    'react-perf/jsx-no-jsx-as-prop': 'off',
    'react-perf/jsx-no-new-array-as-prop': 'off',
    'react-perf/jsx-no-new-function-as-prop': 'off',
    'react-perf/jsx-no-new-object-as-prop': 'off'
  }
});
