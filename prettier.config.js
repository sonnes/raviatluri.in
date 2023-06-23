module.exports = {
  singleQuote: true,
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
  importOrder: [
    '^react(.*)',
    'next/(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
};
