import { defineConfig } from 'oxlint';

// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  options: {
    reportUnusedDisableDirectives: 'warn',
    respectEslintDisableDirectives: false,
    typeAware: true,
    typeCheck: true
  },
  rules: {
    // [ ESLINT-ORIGINATED RULES ]
    // Encourage comments to be capitalized but allow consecutive lines (paragraphs) and inline
    // lowercase.
    'capitalized-comments': [
      'warn',
      'always',
      {
        ignoreConsecutiveComments: true,
        ignoreInlineComments: true,
        // `noinspection`: JetBrains static analyzer suppression comments.
        ignorePattern: '^noinspection'
      }
    ],
    // I'm torn. I kinda want it, but it tends to be annoying too. I prefer to make a method static
    // because it's a conscious design choice, not only depending on whether it uses `this`.
    // Also, this could make the ordering of methods seem weird with statics here and there, that or
    // lose "closer in code = closer in the execution path".
    'class-methods-use-this': 'off',
    // Double equal is not THAT bad in most scenarios & with TypeScript.
    // I hate triple equals everywhere.
    'eqeqeq': 'off',
    // It's so contextual I don't want to force a specific style.
    'func-style': 'off',
    'id-length': [
      'deny',
      {
        // Discard/generic/coordinates/index (not adding y on purpose)/comparison and sorting.
        exceptions: ['_', 'T', 'x', 'y', 'z', 'i', 'a', 'b']
      }
    ],
    // TypeScript will have our back here.
    'init-declarations': 'off',
    'max-classes-per-file': 'off',
    // I hate long files. That being said, sometimes files are long because splitting doesn't make
    // sense and some modules can be deep in behavior. I prefer not to encourage bad splitting.
    'max-lines': 'off',
    // Same logic as max-lines. First, long functions happen very often with JSX even if it's not a
    // complex component. I prefer not to encourage bad splitting -- common sense and testing needs
    // should make the user find a good balance.
    'max-lines-per-function': 'off',
    // Relax max-params arity a tiny bit, 3=>4 and do not count this.
    'max-params': ['deny', { max: 4, countThis: 'never' }],
    'no-plusplus': 'off',
    // Same as max-lines and max-lines-per-function.
    'max-statements': 'off',
    'no-continue': 'off',
    // I often use `== null` to check for null or undefined & I like it like that.
    'no-eq-null': 'off',
    'no-inline-comments': 'off',
    'no-magic-numbers': [
      'deny',
      {
        // Parity/halving/pairing/percent/time.
        ignore: [-1, 0, 1, 2, 60, 100, 1000],
        // Named class constants are a fix.
        ignoreClassFieldInitialValues: true,
        // Same.
        ignoreReadonlyClassProperties: true,
        ignoreDefaultValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreTypeIndexes: true
      }
    ],
    'no-nested-ternary': 'off',
    'no-ternary': 'off',
    // Covered by typescript/only-throw-error.
    'no-throw-literal': 'off',
    'no-undefined': 'off',
    // Can catch real issues, but most of the time they're immediately noticeable when the program
    // runs. The thing is I like declaring some lesser-important symbols later in the file;
    // typically classes (ex. custom errors) and classes are not hoisted in JS, but you have small
    // chances to shoot yourself in the foot.
    'no-use-before-define': 'off',
    'no-void': 'off',
    // Merges every `const` of a scope into a single statement, which costs the blank lines that
    // separate an assignment from its usage. One declaration per binding reads better.
    'one-var': 'off',
    // Redundant with oxfmt handling imports.
    'sort-imports': 'off',
    'sort-keys': 'off',

    // [ IMPORT RULES ]
    // Redundant with oxfmt handling imports.
    'import/consistent-type-specifier-style': 'off',
    // I like better to put exports first, as part of the readily available module interface.
    'import/exports-last': 'off',
    // Not my style & makes it impossible to read whether a function/symbol is exported just by
    // looking at it.
    'import/group-exports': 'off',
    // Encourages pointless module splitting.
    'import/max-dependencies': 'off',
    'import/no-named-export': 'off',
    // There is no modern tooling that doesn't handle tree-shaking properly, and I like
    // `import * as` for utils libraries and modules, ex `* as dateFns`.
    'import/no-namespace': 'off',
    // A bit too restrictive in most real-world projects.
    'import/no-relative-parent-imports': 'off',
    // Side-effectful imports. Few chances of an actual mistake.
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',

    // [ JSDOC RULES ]
    'jsdoc/require-param': 'off',
    // TypeScript has the type, DRY.
    'jsdoc/require-param-type': 'off',
    // TypeScript has the type, DRY.
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns': 'off',
    // TypeScript has the type, DRY.
    'jsdoc/require-returns-type': 'off',
    // TypeScript has the type, DRY.
    'jsdoc/require-yields-type': 'off',

    // [ NODE RULES ]
    // Top-level `await` only bites a module loaded through `require(esm)`, which is a rare way to
    // reach an ESM module now, and never how a script or a bundled entrypoint is loaded.
    'node/no-top-level-await': 'off',

    // [ OXC RULES ]
    'oxc/no-async-await': 'off',
    // Frontend: Not an issue with modern bundlers and libraries, tree-shaking does the job.
    // Backend: The cost is paid at startup, and we'll probably use most symbols exported anyway.
    'oxc/no-barrel-file': 'off',
    'oxc/no-optional-chaining': 'off',
    'oxc/no-rest-spread-properties': 'off',

    // [ PROMISE RULES ]
    // Redundant with TypeScript already checking params and flags valid code for things that are
    // not promises but have a .catch() method with arity >= 2.
    'promise/valid-params': 'off',

    // [ TYPESCRIPT RULES ]
    // Disallow things like `{ complex: type }[]` which is hard to parse.
    'typescript/array-type': ['deny', { default: 'array-simple' }],
    // Relax slightly, especially to allow short arrow functions returning expressions.
    'typescript/explicit-function-return-type': [
      'deny',
      {
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowExpressions: true
      }
    ],
    // Too practical, not THAT confusing (`() => returnsVoid()`).
    'typescript/no-confusing-void-expression': 'off',
    // Targets mistakes like `type T = string | string`.
    // The issue is that I like specifying "useless" type constituents in cases like this example:
    // `type Login = User['username'] | User['email']`, because it self-documents code and intent.
    // As an actual mistake would be unlikely and harmless, I am disabling this rule.
    'typescript/no-duplicate-type-constituents': 'off',
    'typescript/no-invalid-void-type': 'off',
    // It targets type narrowing via `as`; the usage of `as` in itself makes it clear enough that
    // there is some type-hacking going on -- but it's too common to use it legitimately still in
    // real-world projects (badly typed libraries, not powerful enough inference, etc.), making this
    // rule rather annoying, so we disable it, and we will be careful, right?
    'typescript/no-unsafe-type-assertion': 'off',
    // @todo Does not seem to work properly? Flags valid lines. Re-enable later?
    'typescript/prefer-readonly-parameter-types': 'off',
    // I don't find regexp.exec(string) is clearer than string.match(regexp).
    // To me the first is yoda-ish.
    'typescript/prefer-regexp-exec': 'off',
    // I don't like needless `async`, I prefer an explicit Promise return type.
    'typescript/promise-function-async': 'off',
    // I recognize I like to abuse truthiness/falsiness for shorter expressions that I find easier
    // to parse, so this rule annoys me. And while the surface of mistakes possible using unstrict
    // boolean is large, they don't happen that often, especially with TypeScript.
    // Might change my mind later!
    'typescript/strict-boolean-expressions': 'off',

    // [ UNICORN RULES ]
    // I like to put small one-off helpers in the scope even if they don't capture local variables.
    'unicorn/consistent-function-scoping': 'off',
    // Forces you to set an error name property when extending Error.
    // Generally not that useful and rather annoying to do in custom error classes.
    'unicorn/custom-error-definition': 'off',
    'unicorn/explicit-length-check': 'off',
    // Same reason as for eslint's max-* rules disabling.
    'unicorn/max-nested-calls': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off',
    // Has false positives, and if a dev makes an error, it should be immediately spotted; that is
    // not just a smell.
    'unicorn/require-post-message-target-origin': 'off'
  }
});
