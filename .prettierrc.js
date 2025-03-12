'use strict';

module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.html', '*.hbs'],
      options: {
        singleQuote: false,
        parser: 'glimmer',
      },
    },
  ],
};