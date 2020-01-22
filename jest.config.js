module.exports = {
  testURL: 'http://localhost:3000/',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testRegex: '(/__tests__/.*(\\.|/)(integrated|unitary|e2e))\\.test.ts$',
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary', 'text'],
  testTimeout: 10000,
};
