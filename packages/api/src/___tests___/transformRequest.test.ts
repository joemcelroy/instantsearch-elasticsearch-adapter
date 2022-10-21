import { getAggs } from "../transformRequest";
import { SimpleRequest } from "./mocks/AlgoliaRequests";

describe("transformRequest", () => {
  describe("getAggs", () => {
    it("should work for all facets", () => {
      expect(
        getAggs(SimpleRequest[0], {
          search_attributes: [],
          result_attributes: [],
          facet_attributes: [
            "type",
            { attribute: "imdbRating", type: "numeric" },
          ],
        })
      ).toMatchInlineSnapshot(`
        {
          "imdbRating$_entries": {
            "terms": {
              "field": "imdbRating",
              "size": 10,
            },
          },
          "imdbRating$_stats": {
            "stats": {
              "field": "imdbRating",
            },
          },
          "type": {
            "terms": {
              "field": "type",
              "size": 10,
            },
          },
        }
      `);
    });
  });

  it("should work for all facets", () => {
    expect(
      getAggs(
        {
          ...SimpleRequest[0],
          params: {
            ...SimpleRequest[0].params,
            // @ts-ignore
            facets: "imdbRating",
          },
        },
        {
          search_attributes: [],
          result_attributes: [],
          facet_attributes: [
            "type",
            { attribute: "imdbRating", type: "numeric" },
          ],
        }
      )
    ).toMatchInlineSnapshot(`
      {
        "imdbRating$_entries": {
          "terms": {
            "field": "imdbRating",
            "size": 10,
          },
        },
        "imdbRating$_stats": {
          "stats": {
            "field": "imdbRating",
          },
        },
      }
    `);
  });
});
