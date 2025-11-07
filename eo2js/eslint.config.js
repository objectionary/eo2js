// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {FlatCompat} = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({baseDirectory: __dirname});

const google = compat.extends('google').map((cfg) => {
  if (!cfg || !cfg.rules) return cfg;
  const rules = Object.fromEntries(
    Object.entries(cfg.rules).filter(
      ([name]) => name !== 'valid-jsdoc' && name !== 'require-jsdoc'
    )
  );
  return {...cfg, rules};
});

module.exports = [
  ...google,
  {ignores: ['node_modules/']},
  {
    files: ['**/*.js'],
    languageOptions: {ecmaVersion: 2019, globals: {...globals.es2015}},
    rules: {
      'camelcase': 'off',
      'comma-dangle': 'off',
      'indent': ['error', 2],
      'max-len': ['error', {code: 300}],
      'semi': 'off'
    }
  }
];
