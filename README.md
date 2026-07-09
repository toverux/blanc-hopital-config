# @toverux/blanc-hopital

[![NPM Version](https://img.shields.io/npm/v/%40toverux%2Fblanc-hopital)](https://www.npmjs.com/package/@toverux/blanc-hopital)

My coworkers once said I wanted my code as white as hospital walls.

Turns out, it's harder than you might think to get the strictest setup possible, when most tools
apply or provide a "recommended" set of rules (that's fine) but no simple way to enable their
stricter setup.

I was tired of doing the job in multiple repos and maintaining it, endlessly diffing configs to copy
configurations from a project to another or comparing TypeScript versions to see what new options
were available.

So I've created this repo to centralize this work as I'm making it, to reuse it simply, so for now
there's little, but it's carefully crafted.

I am watching toolchain releases and reviewing changelogs to check for new options as they arrive!

For now, it is not published as separate packages, meaning you cannot upgrade, e.g., the TypeScript
config without the Oxlint config as well. Remember that this repo is using the Unlicense, so feel
free to just copy what you need.

## Installation

> npm add -D @toverux/blanc-hopital

## [TypeScript](https://www.typescriptlang.org/tsconfig)

### `strict.json`

Provides one of the strictest TypeScript configurations possible, stricter than
[@tsconfig/strictest](https://github.com/tsconfig/bases/blob/main/bases/strictest.json).

Additionally, it embeds the strictest `angularCompilerOptions` in it (if you don't use Angular,
that's fine — it won't change anything to TypeScript or make anything slower).

Example:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": ["@toverux/blanc-hopital/tsconfig/strict"],
  "compilerOptions": {
    // Some recommended options — adapt as needed.
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "resolveJsonModule": true,
    "importHelpers": true
  }
}
```

### `bun.json`

Provides a sensible set of options when executing TypeScript directly under [Bun](https://bun.sh).

Inspired from [Bun › TypeScript › Suggested `compilerOptions`](https://bun.sh/docs/typescript#suggested-compileroptions).

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": ["@toverux/blanc-hopital/tsconfig/strict", "@toverux/blanc-hopital/tsconfig/bun"],
  "compilerOptions": {
    // ...
  }
}
```

## [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)

A single, curated set of formatting options. Close to industry standards, with a few opinionated
tweaks: single quotes, no trailing commas, `lf` line endings, avoided arrow-function parentheses,
import sorting (no blank lines between groups), and refined JSDoc formatting.

### Example

Here is a project `oxfmt.config.ts` example.

```ts
import { defineConfig } from 'oxfmt';
import config from '@toverux/blanc-hopital/oxfmt';

export default defineConfig({
  ...config,
  // Override or extend with your own options.
  ignorePatterns: ['generated-file.ts']
});
```

> [!TIP]
> **Integrating with CI/commit hooks/etc? Use `oxfmt --check`.**<br>
> By default `oxfmt` rewrites files in place; `--check` instead exits non-zero when a file isn't
> already formatted, without touching it. Add `--no-error-on-unmatched-pattern` when feeding it a
> filtered list of staged files.

## [Oxlint](https://oxc.rs/docs/guide/usage/linter)

### Philosophy

The philosophy: we enable _all_ rules by default and disable/fine-tune as needed, so you never miss
a new rule and stay as strict as possible.

Oxlint has no single "all" switch, because enabling rules is two orthogonal things:
turning on **plugins** (a rule only applies if its plugin is enabled) and turning on **categories**
(`correctness`, `suspicious`, `perf`, `style`, `pedantic`, `restriction`, `nursery`).

Hence, the setup is split into two kinds of configs:

- **`all`**: enables every _base_ plugin (`typescript`, `unicorn`, `oxc`, `import`, `jsdoc`,
  `promise`, `node`) and every category.
  It is completely generic and does one job only: enabling all rules.
- **One config per framework/environment plugin**: `react`, `nextjs`, `vitest`, etc.
  Contrarily to `all`, these bring opinionated defaults specific to Blanc Hopital.
  Add only the ones you use. Their severities are inherited from `all`.

> [!TIP]
> **Integrating with CI/commit hooks/etc? Use `oxlint --deny-warnings`.**<br>
> Stylistic rules are kept at warning level: fine in the editor where you don't want them screaming
> at you, but an antipattern to commit. `--deny-warnings` makes warning-level violations exit
> non-zero.

> [!NOTE]
> Due to the high volatility of nursery rules, the `nursery` category is left off, to avoid breaking
> your linting if you happen to have a version mismatch between your project and Blanc Hopital.
> Opt in to nursery rules individually.

> [!NOTE]
> The `restriction` category bans specific patterns/features, and many of its rules are mutually
> exclusive by design — expect to disable a good chunk of them.

### Severities

The `all` config is the one that defines severities for every category.

Severities are graded rather than uniform, because an Oxlint category forces a single severity onto
all of its rules (there is no "keep each rule's default level" toggle):

- **`correctness` and `suspicious`** are errors: code that is definitely or most likely wrong.
- **`perf`, `style`, `pedantic` and `restriction`** are warnings: opinionated/stylistic rules you
  don't want screaming in the editor.

### Example

Here is a project `oxlint.config.ts` example.

```ts
import { defineConfig } from 'oxlint';
// Enable ALL rules for the base plugins (disable/fine-tune as needed).
import all from '@toverux/blanc-hopital/oxlint/all';
// Add the framework/environment plugins you use.
import react from '@toverux/blanc-hopital/oxlint/react';

export default defineConfig({
  extends: [all, react],
  // Now override with your own rules, these win over the categories enabled above.
  rules: {
    // ...
  }
});
```

### Available configurations

| Configuration        | Description                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `all`                | Enables all base plugins and every category with severity gradation.                                                                  |
| `agnostic`           | Blanc-Hopital opinionated defaults for any JavaScript project. Enables oxlint type awareness, requires npm package `oxlint-tsgolint`. |
| `react`              | Enables the `react` and `jsx-a11y` plugins, with Blanc-Hopital opinionated defaults.                                                  |
| `react-perf-relaxed` | Enabled the `react-perf` plugin, but disables the most aggressive rules.                                                              |

## [JetBrains IDEs](https://www.jetbrains.com/help/idea/configuring-code-style.html)

[idea/Project.xml](https://github.com/toverux/blanc-hopital-config/tree/main/idea/Project.xml) is a
JetBrains IDEA code style configuration file that can be imported and shared into a project (do not
gitignore your .idea folder!).

This config is complimentary to formatter/linter options and allows introducing (but not enforcing)
other fine-grained preferences you might have into your project.

To import it best is to use the UI: `Settings › Editor › Code Style › Scheme › Import Scheme...`
Then select the file, import it. Click on the cog icon again and select `Copy to Project...`.
