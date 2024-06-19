/**
 *
 * 
 * downshift
 * debounce
 *export default function Search(){
 return <SearchStyles> 
 <div>input</div>
 <Dropdown>
 <DropdownItem>
 <DropdownItem>
 <DropdownItem >
 </Dropdown>
 </SearchStyles>
 }
 */

import { resetIdCounter, useCombobox } from 'downshift';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';

const SEARCH_PRODUCT_QUERY = gql`
  query SEARCH_PRODUCT_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: { OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }] }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();

  const [findItems, { data, loading, error }] = useLazyQuery(SEARCH_PRODUCT_QUERY, { fetchPolicy: 'no-cache' });

  const items = data?.searchTerms || [];

  const findItemsButChill = useCallback(debounce(findItems, 350), []);

  //If we are using Downshift in SSR e.g. NextJS, we need to synchronise IDs generated in server and client
  resetIdCounter();

  const { isOpen, highlightedIndex, inputValue, getInputProps, getMenuProps, getItemProps, getComboboxProps } =
    useCombobox({
      items,
      onInputValueChange() {
        findItemsButChill({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange({ selectedItem }) {
        router.push({
          pathname: `/product/${selectedItem.id}`,
        });
      },
      itemToString: (item) => item?.name || '',
    });

  console.log({ data, isOpen });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            id: 'search',
            type: 'search',
            placeholder: 'Search',
            className: loading ? 'loading' : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && <DropDownItem>No results found for key {inputValue}</DropDownItem>}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
