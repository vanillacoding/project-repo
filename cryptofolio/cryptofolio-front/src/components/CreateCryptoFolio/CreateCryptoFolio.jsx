import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CoinList from "../CoinList/CoinList";
import CoinSearch from "../CoinSearch/CoinSearch";
import CoinFilter from "../CoinFilter/CoinFilter";
import CreateRandom from "../CreateRandom/CreateRandom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SelectedList from "../SelectedList/SelectedList";
import Button from "../shared/Button/Button";

import SVG from "../shared/SVG/SVG";

import useCoinFilter from "../../hooks/useCoinFilter";
import useCreateCryptoFolio from "../../hooks/useCreateCryptoFolio";
import useErrorMessage from "../../hooks/useErrorMessage";
import useInput from "../../hooks/useInput";
import usePieChart from "../../hooks/usePieChart";

import { COLOR_SET } from "../../constants/constants";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  background-color: black;
`;

const CoinContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  min-height: 90vh;
`;

const ChartContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 30vw;
  flex: 0.5;
  width: 500px;
  height: 500px;
  background-color: #dfe6e9;
  color: black;
  border-radius: 10px;
`;

const ResultContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 5vw;
  flex: 0.5;
  padding: 10px;
  background-color: #dfe6e9;
  color: black;
  border-radius: 10px;
`;

const CryptoFolioTitle = styled.input`
  display: block;
  padding: 10px 20px;
  margin: 0 auto;
  width: 80%;
  margin-top: 20px;
  margin-bottom: -10px;
  border-radius: 10px;
  border: 0.5px solid gray;
  font-size: 16px;
  font-weight: 600;
`;

const NoCoinMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 210px;
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  button {
    margin: 0 5px;
  }
`;

const size = { height: 400, width: 400, radius: 180 };

const CreateCryptoFolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { coinData } = useSelector((state) => state.coinReducer);
  const [name, onChangeName] = useInput("");
  const [coinList, setCoinList] = useState([]);
  const [error, showErrorMessage] = useErrorMessage("");
  const svgRef = useRef();
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  const { handleSearch, handleFilter } = useCoinFilter(
    coinData,
    setSearchTerm,
    setCoinList
  );

  const { selectedList, totalValue, createHandler } = useCreateCryptoFolio(
    coinData,
    name,
    showErrorMessage,
    setCoinList
  );

  usePieChart(svgRef, selectedList, coinData, size, colorRef.current);

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <FilterContainer>
        <CoinSearch searchTerm={searchTerm} onSearch={handleSearch} />
        <CoinFilter handleFilter={handleFilter} />
      </FilterContainer>
      <CoinContainer>
        <CoinList
          coinList={coinList}
          handleSelect={createHandler.handleSelect}
          selectedList={selectedList}
          handleAmount={createHandler.handleAmount}
        />
      </CoinContainer>
      <ChartContainer>
        <CryptoFolioTitle
          type="text"
          value={name}
          onChange={onChangeName}
          required={true}
          placeholder="Enter Name"
        />
        {selectedList.length === 0 ? (
          <NoCoinMessage>선택된 코인이 없습니다.</NoCoinMessage>
        ) : (
          <SVG ref={svgRef}></SVG>
        )}
      </ChartContainer>
      <ResultContainer>
        <SelectedList selectedList={selectedList} totalValue={totalValue} />
        <CreateButtonContainer>
          <Button
            onClick={createHandler.handleCreate}
            padding={["10px", "20px", "10px", "20px"]}
            fontSize={"1.2rem"}
          >
            Create
          </Button>
          <Button onClick={createHandler.handleReset} bgColor={"#d63031"}>
            Reset
          </Button>
        </CreateButtonContainer>
        <CreateRandom handleRandom={createHandler.handleRandom} />
      </ResultContainer>
    </>
  );
};

export default CreateCryptoFolio;
