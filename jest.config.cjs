module.exports = {
    // Padrão de nomes de arquivos de teste.
    testMatch: ["**/*.test.js", "**/*.spec.js"],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    rootDir: process.cwd(),
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}
