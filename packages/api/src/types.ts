import type { MultipleQueriesQuery as AlgoliaMultipleQueriesQuery } from "@algolia/client-search";
import type {
  SearchRequest as ElasticsearchSearchRequest,
  QueryDslQueryContainer as ElasticsearchQueryDslQuery,
  SearchResponseBody as ElasticsearchBaseResponseBody,
  SearchHit as ElasticsearchBaseHit,
} from "@elastic/elasticsearch/lib/api/types";

type ElasticsearchHitDocument = Record<string, unknown>;
type ElasticsearchHit = ElasticsearchBaseHit<ElasticsearchHitDocument>;

type ElasticsearchResponseBody =
  ElasticsearchBaseResponseBody<ElasticsearchHitDocument>;

type ElasticsearchQuery = ElasticsearchQueryDslQuery;

export type FacetFieldConfig = {
  attribute: string;
  field?: string;
  type?: "numeric" | "string" | "date";
};

export interface ClientConfigConnection {
  host: string;
  apiKey?: string;
}

export type FacetAttribute = string | FacetFieldConfig;

export interface SearchSettingsConfig {
  search_attributes: Array<string>;
  facet_attributes?: FacetAttribute[];
  result_attributes: string[];
  highlight_attributes?: string[];
}

export interface ClientConfig {
  connection: ClientConfigConnection | Transporter;
  search_settings: SearchSettingsConfig;
}

export type SearchRequest = {
  body: ElasticsearchSearchRequest;
  indexName: string;
};

export interface RequestOptions {
  getQuery?: (
    query: string,
    search_attributes: string[]
  ) => ElasticsearchQuery | ElasticsearchQuery[] | undefined;
  getBaseFilters?: () => ElasticsearchQuery[] | undefined;
}

export interface Transporter {
  config?: ClientConfigConnection;
  msearch: (requests: SearchRequest[]) => Promise<ElasticsearchResponseBody[]>;
}

export type {
  AlgoliaMultipleQueriesQuery,
  ElasticsearchSearchRequest,
  ElasticsearchResponseBody,
  ElasticsearchHit,
  ElasticsearchQuery,
};
