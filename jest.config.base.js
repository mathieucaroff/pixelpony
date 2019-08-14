const testFilePatterns = {
   unit: '**/*.test.ts',
   spec: '**/spec/*.spec.ts',
   e2e: '**/test/**/*.e2e.ts',
   all: '**/*.test.ts|**/spec/*.spec.ts|**/test/**/*.e2e.ts',
}

module.exports = {
   globals: {
      'ts-jest': {
         tsConfig: 'tsconfig.json',
      },
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
   },
   testMatch: [testFilePatterns[process.env.TEST_TYPE || 'spec']],
   testEnvironment: 'node',
}
