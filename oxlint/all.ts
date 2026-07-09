import { defineConfig } from 'oxlint';

// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  // Enabling `plugins` overwrites Oxlint's default set (unicorn, typescript, oxc), so the
  // default-on plugins must be listed explicitly here as well.
  // The `eslint` core rules are always on and cannot be toggled, so they are not listed.
  plugins: ['typescript', 'unicorn', 'oxc', 'import', 'jsdoc', 'promise', 'node'],
  // Categories force a single severity on every rule they contain (there is no "keep each rule's
  // default level" toggle), so we grade them:
  categories: {
    // Bugs: code that is definitely or most likely wrong. These should scream.
    correctness: 'error',
    suspicious: 'error',
    // Opinionated/stylistic rules: kept at `warn` so they don't scream in the editor.
    // Escalate them to errors in CI with `oxlint --deny-warnings`.
    perf: 'warn',
    style: 'warn',
    pedantic: 'warn',
    // `restriction` bans specific patterns/features; many of its rules are mutually exclusive by
    // design, so expect to disable a good chunk of them.
    restriction: 'warn',
    // Nursery is left off: these rules are unstable and change between versions, which would break
    // your linting on a version mismatch. Opt-in per-rule instead.
    nursery: 'off'
  }
});
