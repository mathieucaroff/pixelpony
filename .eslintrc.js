module.exports = {
   parser: '@typescript-eslint/parser',
   extends: ['plugin:@typescript-eslint/recommended'],
   parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
   },
   rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/indent': 'off', // let prettier deal with it
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-template': ['error'],
   },
}
