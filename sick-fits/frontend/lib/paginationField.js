import { ALL_PRODUCTS_COUNT_QUERY } from '../components/Pagination';

const paginationField = () => {
  return {
    // Don't cache separate results based on
    // any of this field's arguments.
    keyArgs: false,

    read: (existing = [], { args: { skip: offset = 0, first: limit = existing?.length } = {}, cache }) => {
      //Read the number of items on the page from the cache
      const data = cache.readQuery({ query: ALL_PRODUCTS_COUNT_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = offset / limit + 1;
      const pages = Math.ceil(count / limit);

      if (page > pages || page <= 0) {
        console.warn(`Requested page ${page} exceeds total pages ${pages}`);
        return [];
      }
      const items = existing.slice(offset, offset + limit).filter((x) => x);
      //if there are items AND there aren't enough items to satisfy how many were requessted AND we are on the last page THEN return items
      if (items.length && items.length !== limit && page === pages) return items;
      //check if we have existing items
      if (items.length !== limit) return false;

      if (items.length) return items;

      return false;
    },

    // Concatenate the incoming list items with
    // the existing list items.
    merge: (existing, incoming, { args: { skip: offset = 0 } }) => {
      const merged = existing ? existing.slice(0) : [];
      console.log({ existing, incoming, offset });

      for (let i = 0; i < incoming.length; ++i) {
        merged[offset + i] = incoming[i];
      }
      return merged;
    },
  };
};
export default paginationField;
