import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { getMedicine } from "../../api";

import SearchBar from "../../components/SearchBar";
import Button from "../../components/Shared/Button";
import Loading from "../../components/Shared/Loading";
import TextInput from "../../components/Shared/TextInput";

const SearchForm = ({ medicineList, setMedicineList, setError }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { isLoading, mutate } = useMutation(getMedicine, {
    onSuccess: ({ result, data, message }) => {
      if (result === "fail") {
        setError(message);
      }

      if (data) {
        setKeyword("");
        setSearchResult([]);
        setMedicineList(prevItems => [...prevItems, {
          id: data.medicine_id,
          name: data.itemName,
        }]);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSearch = (event) => {
    event.preventDefault();

    if (!keyword) {
      return;
    }

    mutate({ name: keyword });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSearch} autoComplete="off">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
        <StyledButton type="submit" text="Search">추가</StyledButton>
        <div>
          {medicineList.map((item, i) => (
            <TextInput
              disabled
              key={medicineList[i].id, i}
              name="medicine"
              label={`medicine${i}`}
              value={item.name.length > 20 ? item.name.slice(0, 20) + "…" : item.name}
              readOnly
            />
          ))}
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 0;
  }

  div input {
    margin-top: 10px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export default SearchForm;
