import { useState } from "react";

function useSearch(productList) {
  const [sortedList, setSortedList] = useState(productList);
  const initialFilter = {
    recycleType: "",
    productType: "",
  };
  const [sortFilter, setSortFilter] = useState(initialFilter);

  function sortWithTypes(type, value) {
    const targetType = Object.keys(sortFilter)
      .filter((filterType) => filterType === type)[0];

    const otherType = Object.keys(sortFilter)
      .filter((filterType) => filterType !== type)[0];

    if (sortFilter[otherType]) {
      setSortedList(productList.filter((product) => product[otherType] === sortFilter[otherType]));
    }

    setSortedList((prev) => prev.filter((product) => product[targetType] === value));

    setSortFilter((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  }

  function sortWithKeyword(word) {
    setSortedList(productList.filter((product) => {
      if (product.name.match(word)) {
        return product;
      }

      if (product.productType.match(word) || product.recycleType.match(word)) {
        return product;
      }

      return null;
    }));
  }

  function initializeFilter(e) {
    e.stopPropagation();
    setSortFilter(initialFilter);
    setSortedList(productList);
  }

  return {
    sortFilter,
    sortedList,
    sortWithKeyword,
    sortWithTypes,
    initializeFilter,
  };
}

export default useSearch;
