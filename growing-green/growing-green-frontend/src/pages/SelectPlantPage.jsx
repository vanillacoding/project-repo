import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { searchPlantNames, clearPlantList } from '../redux/modules/search';
import { getMostPopularPlants } from '../redux/modules/plants';

import PlantRecommendation from '../components/PlantRecommendation';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

import backButton from '../assets/images/arrows/back_arrow.png';

export default function SelectPlantPage() {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { plantList, isLoading, error } = useSelector((state) => state.search);
  const { popularPlants } = useSelector((state) => state.plants);

  useEffect(() => {
    dispatch(getMostPopularPlants());
  }, []);

  if (error) {
    <ErrorBox message={error} />;
  }

  if (plantList.length && !inputText.length) {
    dispatch(clearPlantList());
  }

  function onSearchButtonClick(e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      if (inputText.length === 0) {
        return alert('검색어를 입력해주세요');
      }

      dispatch(searchPlantNames(inputText));
    }
  }

  function renderPlantList() {
    return (
      <>
        {plantList?.map((plant, index) => {
          return (
            <Result
              to={`/create/${plantList[index].number}`}
              className="result"
              key={plant.name}
            >
              <h3>{plant.name}</h3>
            </Result>
          );
        })}
      </>
    );
  }

  function renderLoadResultMessage() {
    return <Loading size="50px" text="불러오는 중입니다.." />;
  }

  function renderPleaseEnterMessage() {
    return <p className="info-message">검색어를 입력해주세요</p>;
  }

  return (
    <Wrapper>
      <h1 className="title">Create new plant</h1>
      <InputBox>
        <div className="search-box">
          <BiSearch size="35" color="#393939" />
          <input
            className="search-input"
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
            placeholder="키우고싶은 식물을 찾아보세요"
            onKeyUp={onSearchButtonClick}
          />
        </div>
      </InputBox>
      <ResultContainer data-testid="result-container">
        {isLoading === true
          ? renderLoadResultMessage()
          : plantList.length === 0
          ? renderPleaseEnterMessage()
          : renderPlantList()}
      </ResultContainer>
      <PlantRecommendation plantsNames={popularPlants} />
      <BackButton onClick={() => history.push('/')} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 1200px;
  height: 700px;
  border: red;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin: 3rem;
    font-size: 2.5em;
    color: #223f28;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .search-box {
    border-bottom: 2px solid #777777;

    svg {
      margin-bottom: -10px;
    }

    .search-input {
      all: unset;
      text-align: left;
      font-family: 'GowunBatang-Regular';
      font-weight: 500;
      width: 500px;
      height: 60px;
      border: none;
      background: none;
      font-size: 1.4em;
      margin: 0 0 0 10px;

      &:focus {
        border: none;
      }
    }
  }
`;

const ResultContainer = styled.div`
  width: 530px;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 0.5rem;
  min-height: 30px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;
  max-height: 350px;
  overflow: auto;
  text-overflow: ellipsis;
`;

const Result = styled(Link)`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.baseTheme.colors.black};
  border-bottom: 1px solid #999999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.3rem;

  h3 {
    diplay: block;
  }

  &:hover {
    background-color: rgba(10, 10, 10, 0.07);
  }
`;

const BackButton = styled.button`
  position: absolute;
  width: 76px;
  height: 52px;
  left: 2.5rem;
  border: none;
  bottom: 1rem;
  background: url(${backButton}) no-repeat;
  background-size: cover;
`;

const ButtonWrapper = styled.div`
  margin-top: 15rem;
`;
