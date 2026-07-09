import { defineConfig } from 'oxfmt';

// oxlint-disable-next-line import/no-default-export - standard oxlint pattern
export default defineConfig({
  arrowParens: 'avoid',
  endOfLine: 'lf',
  jsdoc: {
    commentLineStrategy: 'multiline',
    descriptionWithDot: true,
    lineWrappingStyle: 'balance',
    preferCodeFences: true,
    separateReturnsFromParam: true,
    separateTagGroups: true
  },
  quoteProps: 'consistent',
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  sortImports: {
    newlinesBetween: false
  },
  trailingComma: 'none',
  overrides: [
    {
      files: ['*.css', '*.scss', '*.yml'],
      options: {
        singleQuote: false
      }
    }
  ]
});
