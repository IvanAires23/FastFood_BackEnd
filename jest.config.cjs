module.exports = {
    // Padrão de nomes de arquivos de teste.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    rootDir: process.cwd(),
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}
