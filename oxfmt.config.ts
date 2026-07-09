import { defineConfig } from 'oxfmt';
import config from './oxfmt/default.js';

// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  ...config,
  ignorePatterns: ['CHANGELOG.md']
});
