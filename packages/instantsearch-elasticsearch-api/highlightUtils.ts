import type { ElasticsearchHit } from "./types";

export function highlightTerm(value: string, query: string): string {
  const regex = new RegExp(query, "gi");
  return value.replace(regex, (match) => {
    return `<ais-highlight-0000000000>${match}</ais-highlight-0000000000>`;
  });
}

export function getHighlightFields(hit: ElasticsearchHit) {
  const { _source = {}, highlight = {} } = hit;

  const hitHighlights = Object.keys(_source).reduce<Record<string, any>>(
    (sum, fieldKey) => {
      const fieldValue: any = _source[fieldKey];
      const highlightedMatch = highlight[fieldKey];

      if (Array.isArray(fieldValue) && !highlightedMatch) {
        return {
          ...sum,
          [fieldKey]: fieldValue.map((value) => ({
            matchLevel: "none",
            matchedWords: [],
            value: value,
          })),
        };
      } else if (Array.isArray(highlightedMatch)) {
        return {
          ...sum,
          [fieldKey]: highlightedMatch.map((highlightedMatch) => {
            const matchWords = Array.from(
              highlightedMatch.matchAll(
                /\<ais-highlight-0000000000\>(.*?)\<\/ais-highlight-0000000000\>/g
              )
            ).map((match) => match[1]);
            return {
              fullyHighlighted: false,
              matchLevel: "full",
              matchedWords: matchWords,
              value: highlightedMatch,
            };
          }),
        };
      }

      if (!highlightedMatch) {
        return {
          ...sum,
          [fieldKey]: {
            matchLevel: "none",
            matchedWords: [],
            value: fieldValue,
          },
        };
      }
      if (highlightedMatch) {
        const firstMatch: string = highlightedMatch[0];
        debugger;
        return {
          ...sum,
          [fieldKey]: {
            fullyHighlighted: false,
            matchLevel: "full",
            matchedWords: Array.from(
              firstMatch.matchAll(
                /\<ais-highlight-0000000000\>(.*?)\<\/ais-highlight-0000000000\>/g
              )
            ).map((match) => match[1]),
            value: firstMatch,
          },
        };
      }
      return sum;
    },
    {}
  );

  return hitHighlights;
}
