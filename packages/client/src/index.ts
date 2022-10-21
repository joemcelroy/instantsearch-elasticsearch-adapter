interface InstantSearchElasticsearchAdapterConfig {
  url: string;
}

class InstantSearchElasticsearchAdapter {
  constructor(private config: InstantSearchElasticsearchAdapterConfig) {}

  public async clearCache(): Promise<void> {
    return;
  }

  public async search(
    instantsearchRequests: ReadonlyArray<any>
  ): Promise<unknown> {
    try {
      const response = await fetch(this.config.url, {
        body: JSON.stringify(instantsearchRequests),
        method: "POST",
      });

      const results = await response.json();
      return results;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async searchForFacetValues(
    instantsearchRequests: ReadonlyArray<any>
  ): Promise<any> {
    try {
      const response = await fetch(this.config.url, {
        body: JSON.stringify(instantsearchRequests),
        method: "POST",
      });

      const results = await response.json();
      return results.results;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

const createClient = (config: InstantSearchElasticsearchAdapterConfig) => {
  return new InstantSearchElasticsearchAdapter(config);
};

export default createClient;
