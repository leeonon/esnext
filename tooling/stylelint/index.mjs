/**
 * @type {import('stylelint').Config}
 */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null,
    'at-rule-no-unknown': null,
    'selector-type-no-unknown': null,
    'keyframes-name-pattern': null,
    'color-hex-case': 'upper',
    'block-no-empty': true,
  },
};
export default config;
