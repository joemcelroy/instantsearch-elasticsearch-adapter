// const withTM = require("next-transpile-modules")(["@ises/client", "@ises/api"]);
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_staticImage: true
})


// module.exports = withNextra(withTM({
//   // reactStrictMode: true,
// }));

module.exports = withNextra();