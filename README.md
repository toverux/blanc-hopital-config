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
there's not much, but it's carefully crafted.

I am watching toolchain releases and reviewing changelogs to check for new options as they arrive!

For now, it is not published as separate packages, meaning you cannot upgrade ex. the TypeScript
config without the Biome config as well. Remember that this repo is using the Unlicense, so feel
free to just copy what you need.

## Installation

> npm add -D @toverux/blanc-hopital

## [TypeScript](https://www.typescriptlang.org/tsconfig)

### `strict.json`

Provides one of the strictest TypeScript configurations possible, stricter than [@tsconfig/strictest](https://github.com/tsconfig/bases/blob/main/bases/strictest.json).

Additionally, it embeds the strictest `angularCompilerOptions` in it (if you don't use Angular, that's fine — it won't change anything to TypeScript or make anything slower).

Example:

```json5
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

```json5
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": [
    "@toverux/blanc-hopital/tsconfig/strict",
    "@toverux/blanc-hopital/tsconfig/bun"
  ],
  "compilerOptions": {
    // ...
  }
}
```

## [Biome](https://biomejs.dev)

Various Biome configurations are available.

Contrarily to the philosophy of Biome (which aims to have sensible defaults), we will enable *all*
Biome rules by default and disabled/fine-tune them as needed.
This allows us to never miss a new rule and be as strict as possible.

Enabling all rules does not make sense by itself, though, as some rules can contradict each other.
This is why I recommend enabling the `all` preset, then fine-tune as needed.

> [!NOTE]
> Due to the high volatility of Biome nursery rules, there are no configurations for nursery rules, to avoid breaking
> your linting if you happen to have a version mismatch between your project and Blanc Hopital.

Here is a project `biome.jsonc` example.

```json5
{
  "$schema": "node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    // My curated set of formatting rules — close to industry standards.
    "@toverux/blanc-hopital/biome/formatting",
    // Enable ALL rules (disable as-needed) (don't let all rules enabled, some can conflict with each other)
    "@toverux/blanc-hopital/biome/all",
    // Allow barrel files (index.ts), export * and import *, see module for description.
    "@toverux/blanc-hopital/biome/barrels",
    // My curated set of rules for JavaScript/CSS/HTML/GraphQL.
    "@toverux/blanc-hopital/biome/vanilla",
    // My curated set of rules for a Node-compatible environment.
    "@toverux/blanc-hopital/biome/node"
  ],
  // Example, adapt as needed.
  "files": {
    "includes": ["**", "!package.json"]
  },
  // Recommended you enable Git integration.
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "defaultBranch": "main",
    "useIgnoreFile": true
  },
  // Now override with your own rules.
  "linter": {
    // Disable domains you don't need.
    // Don't put "recommended" to keep blanc-hopital activation of all rules.
    "domains": {
      "next": "none", // remove this line if not using Next.js.
      "project": "none", // remove this line unless you really need speed.
      "react": "none", // remove this line if not using React.
      "solid": "none", // remove this line if not using Solid.js
      "test": "none" // remove this line if not using any Jest-like test framework.
    },
    "rules": {
      // ...
    }
  }
}
```

> [!TIP]
> **Integrating with CI/commit hooks/etc? Use `biome check --error-on-warnings`.**<br>
> Keeping rules at their default levels means some will have a warning level. This is fine in the
> editor where you want some linting issues not screaming at you, but it is an antipattern to commit
> invalid code.

## [JetBrains IDEs](https://www.jetbrains.com/help/idea/configuring-code-style.html)

[idea/Project.xml](https://github.com/toverux/blanc-hopital-config/tree/main/idea/Project.xml) is a
JetBrains IDEA code style configuration file that can be imported and shared into a project (do not gitignore your
.idea folder!).

This config is complimentary to formatter/linter options and allows introducing (but not enforcing) other fine-grained
preferences you might have into your project.

To import it best is to use the UI: `Settings › Editor › Code Style › Scheme › Import Scheme...`
Then select the file, import it. Click on the cog icon again and select `Copy to Project...`.
