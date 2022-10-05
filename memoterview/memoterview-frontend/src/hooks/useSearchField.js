import { useState } from "react";

const initialState = {
  inputValue: "",
  searchViewList: [],
  searchItemFocusIndex: -1,
  isListVisible: false,
  isSearchItemMouseOver: false,
};

export default function useSearchField({
  onSearchInputChange,
  onSelectSearchResult,
}) {
  const [searchState, setSearchState] = useState(initialState);

  function handleInputChange(event) {
    const inputValue = event.target.value.trim();

    if (!inputValue) {
      return setSearchState(initialState);
    }

    setSearchState({
      ...searchState,
      inputValue,
      searchItemFocusIndex: -1,
      isListVisible: true,
    });

    onSearchInputChange(inputValue, viewSearchList);
  }

  function handleInputKeyDown(event) {
    const key = event.key;
    const currentFocusIndex = searchState.searchItemFocusIndex;
    const maximumIndex = searchState.searchViewList.length - 1;

    switch (key) {
      case "ArrowUp":
        event.preventDefault();
        const prevFocusIndex =
          currentFocusIndex > -1 ? currentFocusIndex - 1 : -1;

        return setSearchState({
          ...searchState,
          searchItemFocusIndex: prevFocusIndex,
          isListVisible: prevFocusIndex > -1,
        });

      case "ArrowDown":
        event.preventDefault();
        const nextFocusIndex =
          currentFocusIndex < maximumIndex
            ? currentFocusIndex + 1
            : maximumIndex;

        return setSearchState({
          ...searchState,
          searchItemFocusIndex: nextFocusIndex,
          isListVisible: true,
        });

      case "Enter":
        if (searchState.inputValue) {
          selectSearchResult(currentFocusIndex);
        }
    }
  }

  function handleBlur() {
    if (searchState.isSearchItemMouseOver) {
      return selectSearchResult(searchState.searchItemFocusIndex);
    }

    setSearchState({
      ...searchState,
      isListVisible: false,
    });
  }

  function handleFocus() {
    setSearchState({
      ...searchState,
      isListVisible: true,
    });
  }

  function handleSearchItemClick(clickedIndex) {
    selectSearchResult(clickedIndex);
  }

  function handleSearchItemMouseOver(index) {
    setSearchState({
      ...searchState,
      searchItemFocusIndex: index,
      isSearchItemMouseOver: true,
    });
  }

  function handleSearchItemMouseLeave() {
    return setSearchState({
      ...searchState,
      isSearchItemMouseOver: false,
    });
  }

  function viewSearchList(searchViewList) {
    setSearchState((state) => ({
      ...state,
      searchViewList,
    }));
  }

  function selectSearchResult(index) {
    setSearchState(initialState);
    onSelectSearchResult(searchState.searchViewList[index]);
  }

  return {
    searchState,
    handleFocus,
    handleBlur,
    handleInputChange,
    handleInputKeyDown,
    handleSearchItemClick,
    handleSearchItemMouseOver,
    handleSearchItemMouseLeave,
  };
}
