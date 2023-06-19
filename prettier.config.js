module.exports = {
  singleQuote: true,
  semi: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  importOrder: [
    '^react(.*)',
    'next/(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
};
