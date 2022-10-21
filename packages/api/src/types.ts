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

export type {
  AlgoliaMultipleQueriesQuery,
  ElasticsearchSearchRequest,
  ElasticsearchResponseBody,
  ElasticsearchHit,
  ElasticsearchQuery,
};
