/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    transform: {
      '\\.(j|t)sx?': 'babel-jest',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/transform/image.js'
    },
    setupFilesAfterEnv: ['./setup.ts'],
    preset: 'jest-puppeteer',
    testPathIgnorePatterns: ['/node_modules/', '/__tests__/image.test.ts']
  };
};
