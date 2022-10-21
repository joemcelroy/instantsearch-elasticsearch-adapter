import Client, { FacetAttribute } from "@ises/api";
import { NextApiRequest, NextApiResponse } from "next";

const apiClient = Client({
  connection: {
    host: "https://commerce-demo.es.us-east4.gcp.elastic-cloud.com:9243",
    apiKey: "a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw==",
  },
  search_settings: {
    highlight_attributes: ["title", "actors"],
    search_attributes: ["title", "actors"],
    result_attributes: ["title", "actors", "poster"],
    facet_attributes: [
      "type",
      { attribute: "actors", field: "actors.keyword" },
      "rated",
      { attribute: "imdbrating", type: "numeric" },
      { attribute: "metascore", type: "numeric" },
    ],
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const results = await apiClient.handleRequest(body, {
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
