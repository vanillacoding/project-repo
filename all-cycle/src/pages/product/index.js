import { useState } from "react";

import fetchData from "@/utils/fetchData";
import useSearch from "@/hooks/useSearch";
import FilterContainer from "@/components/layout/filter";
import ProductItem from "@/components/layout/product";
import SearchBar from "@/components/layout/product/SearchBar";
import Message from "@/components/element/Message";
import { Container, NextLink, List } from "@/components/layout/product/styled";

function Search({ productList }) {
  const {
    sortFilter,
    sortedList,
    sortWithTypes,
    sortWithKeyword,
    initializeFilter,
  } = useSearch(productList);

  const [message, setMessage] = useState("");

  function handleError(message) {
    setMessage(message);
  }

  return (
    <Container>
      <SearchBar sortWithKeyword={sortWithKeyword} handleError={handleError} />
      {message && <Message>{message}</Message>}

      <FilterContainer
        sortFilter={sortFilter}
        sortWithTypes={sortWithTypes}
        initializeFilter={initializeFilter}
      />

      <List>
        {sortedList?.map((product, index) => (
          <NextLink key={product._id} href={`/product/${product._id}`} prefetch>
            <ProductItem product={product} isEven={index % 2} />
          </NextLink>
        ))}
      </List>
    </Container>
  );
}

export default Search;

export async function getServerSideProps() {
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/product`);

  if (response.result) {
    return {
      props: { productList: response.data },
    };
  }

  return {
    props: { productList: [] },
  };
}
