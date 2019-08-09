module.exports = {
   arrowParens: 'always',
   bracketSpacing: true,
   endOfLine: 'lf',
   printWidth: 80,
   quoteProps: 'consistent',
   semi: false,
   singleQuote: true,
   tabWidth: 3,
   trailingComma: 'all',
   useTabs: false,
   overrides: [
      {
         files: '*.md',
         options: {
            tabWidth: 2,
         },
      },
   ],
}
