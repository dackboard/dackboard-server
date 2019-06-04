module.exports = {
    testEnvironment: 'node',
    transform: {
        // transform typescript files to js before running the tests
        "^.+\\.ts$": "ts-jest"
    }
};