import { FacetAttribute } from ".";

export const createRegexQuery = (queryString: string) => {
  let query = queryString.replace(
    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    "\\$&"
  );
  query = query
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return `[${char}${char.toUpperCase()}]`;
      }
      return char;
    })
    .join("");
  query = `${query}.*`;
  if (queryString.length > 2) {
    query = `([a-zA-Z]+ )+?${query}`;
  }
  return query;
};

export const getFacetField = (
  facet_attributes: FacetAttribute[],
  attribute: string
) => {
  if (facet_attributes.includes(attribute)) {
    return attribute;
  } else {
    return (
      facet_attributes
        .filter((a) => typeof a !== "string")
        // @ts-ignore: object is possibly null
        .find((a) => a.attribute === attribute)?.field || attribute
    );
  }
};

export const getFacetFieldType = (
  facet_attributes: FacetAttribute[],
  attribute: string
) => {
  if (facet_attributes.includes(attribute)) {
    return attribute;
  } else {
    return (
      facet_attributes
        .filter((a) => typeof a !== "string")
        // @ts-ignore: object is possibly null
        .find((a) => a.attribute === attribute)?.type || "string"
    );
  }
};
