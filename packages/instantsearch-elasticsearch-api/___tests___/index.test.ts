import Client from "../index";
import "cross-fetch/polyfill";
import {
  DisjunctiveExampleRequest,
  nonDynamicFacetRequest,
  NumericFiltersExampleRequest,
} from "./mocks/AlgoliaRequests";
import { AlgoliaMultipleQueriesQuery } from "../types";

describe("API", () => {
  it("should work", async () => {
    const client = new Client({
      connection: {
        host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
        apiKey: "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
      },
      fields: {
        actors: {
          facet_field: "actors.keyword",
        },
      },
      highlight_attributes: ["title", "actors"],
      search_attributes: ["title", "actors", "query"],
      result_attributes: ["title", "actors", "query"],
      facet_attributes: ["type", "actors", "rated"],
      hitsPerPage: 20,
    });

    const response = await client.handleInstantSearchRequests(
      DisjunctiveExampleRequest as AlgoliaMultipleQueriesQuery[]
    );

    response.results.map((a) => (a.processingTimeMS = 0));
    expect(response).toMatchSnapshot();
  });

  describe("facets", () => {
    it("non dynamic facets", async () => {
      const client = new Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        fields: {
          actors: {
            facet_field: "actors.keyword",
          },
          imdbrating: {
            type: "numeric",
          },
        },
        highlight_attributes: ["title", "actors"],
        search_attributes: ["title", "actors", "query"],
        result_attributes: ["title", "actors", "query"],
        facet_attributes: ["type", "actors", "rated", "imdbrating"],
        hitsPerPage: 20,
      });

      const response = await client.handleInstantSearchRequests(
        nonDynamicFacetRequest as AlgoliaMultipleQueriesQuery[]
      );

      response.results.map((a) => (a.processingTimeMS = 0));
      expect(response).toMatchSnapshot();
    });

    it("numeric facets", async () => {
      const client = new Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        fields: {
          actors: {
            facet_field: "actors.keyword",
          },
          imdbrating: {
            type: "numeric",
          },
        },
        highlight_attributes: ["title", "actors"],
        search_attributes: ["title", "actors", "query"],
        result_attributes: ["title", "actors", "query"],
        facet_attributes: ["type", "actors", "rated", "imdbrating"],
        hitsPerPage: 20,
      });

      const response = await client.handleInstantSearchRequests(
        DisjunctiveExampleRequest as AlgoliaMultipleQueriesQuery[]
      );

      response.results.map((a) => (a.processingTimeMS = 0));
      expect(response).toMatchSnapshot();
    });

    it("numeric filters", async () => {
      const client = new Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        fields: {
          actors: {
            facet_field: "actors.keyword",
          },
          imdbrating: {
            type: "numeric",
          },
        },
        highlight_attributes: ["title", "actors"],
        search_attributes: ["title", "actors", "query"],
        result_attributes: ["title", "actors", "query"],
        facet_attributes: ["type", "actors", "rated", "imdbrating"],
        hitsPerPage: 20,
      });

      const response = await client.handleInstantSearchRequests(
        NumericFiltersExampleRequest as AlgoliaMultipleQueriesQuery[]
      );

      response.results.map((a) => (a.processingTimeMS = 0));
      expect(response).toMatchSnapshot();
    });
  });
});
