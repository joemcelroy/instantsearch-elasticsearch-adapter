import Client, {
  FacetAttribute,
} from "@instantsearch-elasticsearch-adapter/api";
import { NextApiRequest, NextApiResponse } from "next";

const apiConfig = {
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
      { attribute: "actors", field: "actors.keyword" } as FacetAttribute,
      "rated",
      { attribute: "imdbrating", type: "numeric" } as FacetAttribute,
      { attribute: "metascore", type: "numeric" } as FacetAttribute,
    ],
  },
};

const client = new Client(apiConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await client.handleRequest(req, {
    getQuery: (query, search_attributes) => {
      return [
        {
          combined_fields: {
            query,
            fields: search_attributes,
          },
        },
      ];
    },
    getBaseFilters: () => {
      return [
        {
          bool: {
            must: {
              range: {
                imdbrating: {
                  gte: 1,
                },
              },
            },
          },
        },
      ];
    },
  });
  res.send(results);
}
