const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({ baseDirectory: __dirname });

const google = compat.extends('google').map((cfg) => {
  if (!cfg || !cfg.rules) return cfg;
  const { ['valid-jsdoc']: _drop1, ['require-jsdoc']: _drop2, ...rules } = cfg.rules;
  return { ...cfg, rules };
});

module.exports = [
  ...google,
  {
    languageOptions: {
      ecmaVersion: 2019,
      globals: { ...globals.es2015 },
    },
    rules: {
      camelcase: 'off',
      'comma-dangle': 'off',
      indent: ['error', 2],
      'max-len': ['error', { code: 300 }],
      semi: 'off',
    },
  },
];
