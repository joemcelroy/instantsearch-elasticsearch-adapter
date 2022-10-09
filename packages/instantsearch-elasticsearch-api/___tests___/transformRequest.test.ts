import { getAggs } from "../transformRequest";
import { SimpleRequest } from "./mocks/AlgoliaRequests";

const exampleConfig = {
  connection: {
    host: "blah",
    apiKey: "blah",
  },
};

describe("transformRequest", () => {
  describe("getAggs", () => {
    it("should work", () => {
      expect(
        getAggs(SimpleRequest[0], {
          ...exampleConfig,
          search_attributes: [],
          result_attributes: [],
          facet_attributes: ["type", "imdbRating"],
          fields: {
            imdbRating: {
              type: "numeric",
            },
          },
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
});
