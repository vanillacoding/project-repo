import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchPlantInfo } from '../redux/modules/search';
import { createNewPlant } from '../redux/modules/plants';
import styled from 'styled-components';

import PlantGrowthCanvas from '../components/PlantGrowthCanvas';
import PlantInfo from '../components/PlantInfo';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import TextButton from '../components/TextButton';

import defaultPlant from '../assets/images/plants/default_plant.png';
import cloverPlant from '../assets/images/plants/clover_plant.png';
import treePlant from '../assets/images/plants/tree_plant.png';
import backButton from '../assets/images/arrows/back_arrow.png';
import adultDefaultPlant from '../assets/images/plants/default_plant3.png';
import adultTreePlant from '../assets/images/plants/tree_plant3.png';
import adultCloverPlant from '../assets/images/plants/clover_plant3.png';
import chair from '../assets/images/furniture/chair.png';

export default function CreatePlantPage({ theme }) {
  const { plantNumber } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { plantInfo, isLoading, error } = useSelector((state) => state.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({
    nickname: '',
    type: 'defaultPlant',
    growthStage: '1',
  });

  useEffect(() => {
    dispatch(searchPlantInfo(plantNumber));
  }, [dispatch, plantNumber]);

  if (error) {
    return <ErrorBox message={error} />;
  }

  if (isLoading === true) {
    return <Loading size="60px" text="식물 정보를 불러오고 있습니다..." />;
  }

  function submitData(e) {
    e.preventDefault();

    if (selectedData.nickname.length === 0) {
      return alert('식물의 이름을 입력해주세요.');
    }

    dispatch(
      createNewPlant({
        history,
        name: selectedData.nickname,
        species: plantInfo.name,
        type: selectedData.type,
        isSunPlant: plantInfo.isSunPlant,
        watering: plantInfo.watering,
        growthStage: selectedData.growthStage,
      }),
    );
  }

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <PlantGrowthCanvas
            plantType={selectedData.type}
            onGrowthEnd={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      <Container theme={theme}>
        {plantInfo && (
          <>
            <Aside>
              <PlantInfo plant={plantInfo} />
              <ImageWrapper>
                {selectedData.type === 'cloverPlant' && (
                  <img className="plant" src={cloverPlant} alt="clover plant" />
                )}
                {selectedData.type === 'defaultPlant' && (
                  <img
                    className="plant"
                    src={defaultPlant}
                    alt="default plant"
                  />
                )}
                {selectedData.type === 'treePlant' && (
                  <img className="plant" src={treePlant} alt="tree plant" />
                )}
                <img className="chair" src={chair} alt="chair" />
              </ImageWrapper>
            </Aside>
            <PlantFrom onSubmit={submitData}>
              <NicknameInput>
                <input
                  id="nickname"
                  className="input-item nickname"
                  type="text"
                  placeholder="식물의 닉네임을 입력해주세요"
                  value={selectedData.nickname}
                  onChange={(e) =>
                    setSelectedData({
                      ...selectedData,
                      nickname: e.currentTarget.value,
                    })
                  }
                />
              </NicknameInput>
              <TypeInput theme={theme}>
                <h3 className="for-types">식물의 형태를 선택해주세요.</h3>
                <div className="checkbox-container">
                  <input
                    className="checkbox-types"
                    type="radio"
                    name="types"
                    id="defaultPlant"
                    value="defaultPlant"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        type: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="defaultPlant">
                    <img src={adultDefaultPlant} alt="adult default plant" />
                  </label>
                  <input
                    className="checkbox-types"
                    type="radio"
                    name="types"
                    id="treePlant"
                    value="treePlant"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        type: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="treePlant">
                    <img src={adultTreePlant} alt="adult tree plant" />
                  </label>
                  <input
                    className="checkbox-types"
                    type="radio"
                    value="cloverPlant"
                    name="types"
                    id="cloverPlant"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        type: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="cloverPlant">
                    <img src={adultCloverPlant} alt="adult clover plant" />
                  </label>
                </div>
              </TypeInput>
              <GrowthStageInput>
                <h3>식물의 성장 단계를 선택해주세요.</h3>
                <div className="checkbox-container">
                  <input
                    className="checkbox-growth"
                    type="radio"
                    name="growth"
                    id="seedStage"
                    value="1"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        growthStage: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="seedStage">1단계</label>
                  <input
                    className="checkbox-growth"
                    type="radio"
                    name="growth"
                    id="youngStage"
                    value="2"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        growthStage: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="youngStage">2단계</label>
                  <input
                    className="checkbox-growth"
                    type="radio"
                    name="growth"
                    id="adultStage"
                    value="3"
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        growthStage: e.currentTarget.value,
                      })
                    }
                  />
                  <label htmlFor="adultStage">3단계</label>
                </div>
              </GrowthStageInput>
              <ButtonContainer>
                <TextButton
                  type="submit"
                  className="submit-button"
                  variant="outline"
                  size="small"
                  color="green"
                  label="추가하기"
                />
                <TextButton
                  type="button"
                  className="preview-button"
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  size="small"
                  color="red"
                  label="성장 미리보기"
                />
              </ButtonContainer>
            </PlantFrom>
          </>
        )}
        <BackButton onClick={() => history.push('/create')} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: absolute;
`;

const PlantFrom = styled.form`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 600px;
  height: 500px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: 50px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;
`;

const Aside = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: 10px;
  display: inline-block;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  width: 200px;
  height: 310px;

  .chair {
    position: absolute;
    margin-bottom: 10px;
    width: 140px;
    bottom: 10px;
    right: 80px;
    z-index: -1;
  }

  .plant {
    position: absolute;
    width: 100px;
    top: 40px;
    right: 100px;
  }
`;

const NicknameInput = styled.div`
  input {
    width: 100%;
    height: 50px;
    font-size: 1.3em;
    font-family: 'GowunBatang-Regular';
  }
`;

const TypeInput = styled.div`
  .checkbox-types {
    display: none;
    border: none;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .checkbox-types:checked + label,
  .checkbox-types:not(:checked) + label {
    padding: 1rem;
    width: 110px;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .checkbox-types:not(:checked) + label {
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  .checkbox-types:checked + label {
    background: ${({ theme }) => theme.baseTheme.colors.lightGreen};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .checkbox-types:not(:checked) + label:hover {
    background: ${({ theme }) => theme.baseTheme.colors.lightGreen};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const GrowthStageInput = styled.div`
  .checkbox-growth {
    display: none;
    border: none;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .checkbox-growth:checked + label,
  .checkbox-growth:not(:checked) + label {
    padding: 1rem;
    width: 110px;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .checkbox-growth:not(:checked) + label {
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  .checkbox-growth:checked + label {
    background: ${({ theme }) => theme.baseTheme.colors.lightGreen};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .checkbox-growth:not(:checked) + label:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.baseTheme.colors.lightGray};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  position: absolute;
  width: 76px;
  height: 52px;
  left: -100px;
  border: none;
  bottom: -10px;
  background: url(${backButton}) no-repeat;
  background-size: cover;
`;
