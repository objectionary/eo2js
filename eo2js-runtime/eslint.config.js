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

/**
 * @todo #152:45min Re-enable or formalize the no-invalid-this rule by deciding whether runtime should keep this as rho-context pattern with documentation or refactor to use explicit rho parameter, then apply consistently across runtime and remove suppressions.
 *  Background: runtime factories use `this` as ρ-context (e.g. at_lambda/attributes, package resolution),
 *  which ESLint flags in non-method functions. Temporary suppression keeps current behavior.
 *  Do:
 *   1) Decide convention: (A) keep `this` as ρ and document/tests; or (B) pass explicit `rho/self`.
 *   2) Apply consistently across runtime (e.g., src/runtime/attribute/*, src/runtime/package.js).
 *   3) Remove local suppressions and set this rule to 'error' here.
 */
module.exports = [
  ...google,
  {ignores: ['node_modules/']},
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {...globals.es2015},
    },
    rules: {
      'camelcase': 'off',
      'comma-dangle': 'off',
      'indent': ['error', 2, {SwitchCase: 1}],
      'max-len': ['error', {code: 300}],
      'semi': 'off',
      'no-invalid-this': 'off',
    },
  },
];
