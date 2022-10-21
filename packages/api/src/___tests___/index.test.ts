import Client from "../index";
import {
  DisjunctiveExampleRequest,
  nonDynamicFacetRequest,
  NumericFiltersExampleRequest,
} from "./mocks/AlgoliaRequests";
import { AlgoliaMultipleQueriesQuery } from "../types";

import nock from "nock";
import {
  HitsResponseWithFacetFilter,
  HitsResponseWithFacetFilterAndNumericFacet,
  HitsResponseWithFacetFilterAndNumericFacetAndNumericFilter,
  HitsWithNoQueryOrFiltersResponse,
} from "./mocks/ElasticsearchResponses";

// nock.recorder.rec();

describe("API", () => {
  it("should work", async () => {
    const client = Client({
      connection: {
        host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
        apiKey: "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
      },
      search_settings: {
        highlight_attributes: ["title", "actors"],
        search_attributes: ["title", "actors", "query"],
        result_attributes: ["title", "actors", "query"],
        facet_attributes: [
          "type",
          { field: "actors.keyword", attribute: "actors", type: "string" },
          "rated",
        ],
      },
    });

    nock("https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243")
      .post("/_msearch", (requestBody: any) => {
        expect(requestBody).toMatchSnapshot("ES Request");
        return true;
      })
      .reply(200, HitsResponseWithFacetFilter);

    const response = await client.handleInstantSearchRequests(
      DisjunctiveExampleRequest as AlgoliaMultipleQueriesQuery[]
    );

    expect(response).toMatchSnapshot();
  });

  describe("facets", () => {
    it("non dynamic facets", async () => {
      const client = Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        search_settings: {
          highlight_attributes: ["title", "actors"],
          search_attributes: ["title", "actors", "query"],
          result_attributes: ["title", "actors", "query"],
          facet_attributes: [
            "type",
            { field: "actors.keyword", attribute: "actors", type: "string" },
            "rated",
            { attribute: "imdbrating", type: "numeric" },
          ],
        },
      });

      nock("https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243")
        .post("/_msearch", (requestBody: any) => {
          expect(requestBody).toMatchSnapshot("ES Request");
          return true;
        })
        .reply(200, HitsWithNoQueryOrFiltersResponse);

      const response = await client.handleInstantSearchRequests(
        nonDynamicFacetRequest as AlgoliaMultipleQueriesQuery[]
      );

      expect(response).toMatchSnapshot();
    });

    it("numeric facets", async () => {
      const client = Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        search_settings: {
          highlight_attributes: ["title", "actors"],
          search_attributes: ["title", "actors"],
          result_attributes: ["title", "actors"],
          facet_attributes: [{ attribute: "imdbrating", type: "numeric" }],
        },
      });

      nock("https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243")
        .post("/_msearch", (requestBody: any) => {
          expect(requestBody).toMatchSnapshot("ES Request");
          return true;
        })
        .reply(200, HitsResponseWithFacetFilterAndNumericFacet);

      const response = await client.handleInstantSearchRequests(
        DisjunctiveExampleRequest as AlgoliaMultipleQueriesQuery[]
      );

      expect(response).toMatchSnapshot();
    });

    it("numeric filters", async () => {
      const client = Client({
        connection: {
          host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
          apiKey:
            "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
        },
        search_settings: {
          highlight_attributes: ["title", "actors"],
          search_attributes: ["title", "actors", "query"],
          result_attributes: ["title", "actors", "query"],
          facet_attributes: [
            "type",
            { field: "actors.keyword", attribute: "actors", type: "string" },
            "rated",
            { attribute: "imdbrating", type: "numeric" },
          ],
        },
      });

      nock("https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243")
        .post("/_msearch", (requestBody: any) => {
          expect(requestBody).toMatchSnapshot("ES Request");
          return true;
        })
        .reply(200, HitsResponseWithFacetFilterAndNumericFacetAndNumericFilter);

      const response = await client.handleInstantSearchRequests(
        NumericFiltersExampleRequest as AlgoliaMultipleQueriesQuery[]
      );

      expect(response).toMatchSnapshot();
    });
  });
});
