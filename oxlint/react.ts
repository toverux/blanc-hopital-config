import { defineConfig } from 'oxlint';

// Enables the `react` and `jsx-a11y` plugins with custom rules.
// Severities come from the categories declared in `all` when you compose them via `extends`.
// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'react/jsx-boolean-value': ['deny', 'always'],
    'react/jsx-no-useless-fragment': 'off',
    // Allow tsx files.
    'react/jsx-filename-extension': ['off', { allow: 'as-needed', extensions: ['jsx', 'tsx'] }],
    // `dangerouslySetInnerHTML` is already clear per se.
    'react/no-danger': 'off',
    // Forbids setting className and style, but TypeScript as our back.
    'react/forbid-component-props': 'off',
    // I prefer not to encourage useless splitting.
    'react/jsx-max-depth': 'off',
    'react/jsx-props-no-spreading': 'off',
    // Handled by TypeScript and I always use TypeScript.
    'react/react-in-jsx-scope': 'off'
  }
});
