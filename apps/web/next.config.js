const withTM = require("next-transpile-modules")(["@instantsearch-elasticsearch-adapter/client", "@instantsearch-elasticsearch-adapter/api"]);

module.exports = withTM({
  // reactStrictMode: true,
});
