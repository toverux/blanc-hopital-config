import { defineConfig } from 'oxlint';
import agnostic from './oxlint/agnostic.js';
import all from './oxlint/all.js';

// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  extends: [all, agnostic]
});
