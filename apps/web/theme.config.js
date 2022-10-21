// eslint-disable-next-line import/no-anonymous-default-export
export default {
  projectLink: 'https://github.com/joemcelroy/instantsearch-elasticsearch-adapter', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/joemcelroy/instantsearch-elasticsearch-adapter/blob/master', // base URL for the docs repository
  titleSuffix: ' – Instantsearch Elasticsearch Adapter',
  nextLinks: false,
  prevLinks: false,
  footer: true,
  search: false,
  floatTOC: true,
  footerText: `MIT ${new Date().getFullYear()} © Joseph McElroy.`,
  footerEditLink: `Edit this page on GitHub`,
  chat: {
    link: "https://turborepo.org/discord",
  },
  logo: (
      <h2 className="font-bold">ISES: Instantsearch Elasticsearch Adapter</h2>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="An adapter to use Elasticsearch with Instantsearch UI library" />
      <meta name="og:title" content="Use Instantsearch UI library with Elasticsearch" />
    </>
  ),
}