// // jest.config.ts

// import type { Config } from 'jest';
// import nextJest from 'next/jest.js';

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

// // Add any custom config to be passed to Jest
// const config: Config = {
//   coverageProvider: 'v8',
//   testEnvironment: 'jsdom',
//   // Add more setup options before each test is run
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

// module.exports = {
//   ...createJestConfig(config),
// };

// jest.config.ts
// jest.config.ts

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Ensure setupFilesAfterEnv includes the correct path to jest.setup.ts
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
};

export default createJestConfig(config);
