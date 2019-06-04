module.exports = {
    // Since the config is in /config, set root to the above directory
    rootDir: '../',
    testEnvironment: 'node',
    transform: {
        // transform typescript files to js before running the tests
        "^.+\\.ts$": "ts-jest"
    }
};