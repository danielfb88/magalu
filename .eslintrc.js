module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/indent': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 75
    }],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'semi': ['error', 'never'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enum',
        format: ['PascalCase'],
        suffix: ['Enum']
      }
    ],
    'import/no-cycle': 'off',
    radix: ['error', 'as-needed'],
  },
};
