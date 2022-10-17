# Instantsearch Elasticsearch Adapter

InstantSearch Elasticsearch Adapter is a javascript library that lets you use Elasticsearch with Algolia's Instantsearch, a javascript library for building performant and instant search experiences.

Here is an example of UI you can build with this adapter and Elasticsearch: [INSERT LINK]()

With the adapter in this repository, you'll be able to use [Instantsearch.js](https://github.com/algolia/instantsearch.js) plus:

- [React InstantSearch][react-instantsearch-github]
- [Vue InstantSearch][vue-instantsearch-github]
- [Angular InstantSearch][instantsearch-angular-github]
- [React InstantSearch Native][react-instantsearch-github]

to quickly build great search experiences with Elasticsearch.

## How it works

![overview](images/ises-overview.png)

The adapter provides two public libraries:

- A node API which transforms instantsearch requests into Elasticsearch queries
- a lightweight frontend client that integrates with the instantsearch library and the Adapter's node API

## Get started

Below we are using Next JS and React instantsearch as an example but you can integrate the API and frontend on any framework you use today.

Below we assume you have a Next JS site setup already.

[Edit in CodeSandbox]()

#### Install dependencies

React InstantSearch is available on the npm registry. It relies on @instantsearch-elasticsearch-adapter/client to communicate with the node API.

```
yarn add @instantsearch-elasticsearch-adapter/api @instantsearch-elasticsearch-adapter/client react-instantsearch-dom
# OR
npm install @instantsearch-elasticsearch-adapter/api @instantsearch-elasticsearch-adapter/client react-instantsearch-dom
```

#### Setup the API

This transforms the instantsearch requests sent from the browser into Elasticsearch queries and transforms the responses into instantsearch results.

```typescript
// pages/api/search.ts

import Client from "@instantsearch-elasticsearch-adapter/api";
import { NextApiRequest, NextApiResponse } from "next";

const client = new Client({
  connection: {
    host: "<elasticsearch-host>",
    apiKey: "<api-key>", // optional
  },
  search_settings: {
    highlight_attributes: ["title", "actors"],
    search_attributes: ["title", "actors"],
    result_attributes: ["title", "actors"],
    facet_attributes: ["type", "rated"],
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await client.handleRequest(req);
  res.send(results);
}
```

##### Other examples:

- [Express JS]()
- [Cloudflare Workers]()
- [AWS Lambda]()

#### Setup the Frontend

Using InstantSearch with Instantsearch Elasticsearch Adapter is as simple as adding this JavaScript code to your page:

```javascript
// pages/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import Client from "@instantsearch-elasticsearch-adapter/client";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = new Client({
  url: "/api/search", // API url
});

const App = () => (
  <InstantSearch indexName="bestbuy" searchClient={searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default App;
```

##### Other examples:

- [Instantsearch.js]()

### Documentation

Tweaking Relevance

- Requires fields which are
  Facets
- Requires keyword field
  Highlighting
  Sorting

Codesandbox example

- Whats Supported

  - Results
  - Facets & Facet Filters
  -

- Whats missing
  - Autocomplete
  - GEO search
  - Facets
    - Hierarchical Facet
  - Elasticsearch Nested field support
  - Algolia tag Filters
  - Grouping
    Relevance
    - synonym Support
    - Query Rules Support
    -
