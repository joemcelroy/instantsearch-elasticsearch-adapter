import { transformRequest } from "./transformRequest";
import type { MultipleQueriesQuery as AlgoliaMultipleQueriesQuery } from "@algolia/client-search";
import transformResponse, {
  transformFacetValuesResponse,
} from "./transformResponse";
import {
  ElasticsearchSearchRequest,
  ElasticsearchResponseBody,
  ElasticsearchQuery,
} from "./types";

export type FacetFieldConfig = {
  attribute: string;
  field: string | undefined;
  type: "numeric" | "string" | "date" | undefined;
};

export interface ClientConfigConnection {
  host: string;
  apiKey: string;
}

export type FacetAttribute = string | FacetFieldConfig;

export interface SearchSettingsConfig {
  search_attributes: Array<string>;
  facet_attributes?: FacetAttribute[];
  result_attributes: string[];
  highlight_attributes?: string[];
}

export interface ClientConfig {
  connection: ClientConfigConnection;
  search_settings: SearchSettingsConfig;
}

type SearchRequest = {
  body: ElasticsearchSearchRequest;
  indexName: string;
};

export interface RequestOptions {
  getQuery?: (
    query: string,
    search_attributes: string[]
  ) => ElasticsearchQuery | ElasticsearchQuery[];
  getBaseFilters?: () => ElasticsearchQuery[];
}

class Transporter {
  constructor(private config: ClientConfigConnection) {}

  async msearch(
    requests: SearchRequest[]
  ): Promise<ElasticsearchResponseBody[]> {
    // @ts-ignore
    const response = await fetch(`${this.config.host}/_msearch`, {
      headers: {
        authorization: `ApiKey ${this.config.apiKey}`,
        "content-type": "application/json",
      },
      body: requests
        .reduce<string[]>(
          (sum, request) => [
            ...sum,
            JSON.stringify({ index: request.indexName }),
            "\n",
            JSON.stringify(request.body),
            "\n",
          ],
          []
        )
        .join(""),
      method: "POST",
    });

    const responses = await response.json();
    return responses.responses;
  }
}

class Client {
  transporter: Transporter;

  constructor(private config: ClientConfig) {
    this.transporter = new Transporter(config.connection);
  }

  private async performSearch(requests: SearchRequest[]) {
    const responses = await this.transporter.msearch(requests);
    return responses;
  }

  async handleRequest(req: any, requestOptions?: RequestOptions) {
    const instantsearchRequests = JSON.parse(
      req.body
    ) as AlgoliaMultipleQueriesQuery[];

    const instantsearchResponses = this.handleInstantSearchRequests(
      instantsearchRequests,
      requestOptions
    );

    return instantsearchResponses;
  }

  async handleInstantSearchRequests(
    instantsearchRequests: AlgoliaMultipleQueriesQuery[],
    requestOptions?: RequestOptions
  ) {
    const esRequests: SearchRequest[] = instantsearchRequests.map(
      (request, i) => {
        return {
          body: transformRequest(
            request,
            this.config.search_settings,
            requestOptions
          ),
          indexName: request.indexName,
        };
      }
    );

    const esResponses = await this.performSearch(esRequests);

    const instantsearchResponses = esResponses.map((response, i) => {
      // @ts-ignore
      if (instantsearchRequests[i].params?.facetName) {
        return transformFacetValuesResponse(
          response,
          instantsearchRequests[i],
          this.config
        );
      }
      return transformResponse(
        response,
        instantsearchRequests[i],
        this.config.search_settings
      );
    });

    return {
      results: instantsearchResponses,
    };
  }
}

export default Client;