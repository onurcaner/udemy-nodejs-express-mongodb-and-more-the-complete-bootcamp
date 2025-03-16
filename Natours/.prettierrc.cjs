/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '^(w|@w)', // node_modules
    '^(./|../|@/|/)', // local
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
