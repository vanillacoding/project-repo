import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getGameRecords } from "../../redux/slices/singlePlaySlice";
import PageCard from "../../components/shared/PageCard";
import MainPageLayout from "../../components/MainPageLayout";

const RecordPage = () => {
  const dispatch = useDispatch();
  const records = useSelector(({ single }) => single.records);
  const history = useHistory();

  useEffect(() => {
    dispatch(getGameRecords());
  }, []);

  const handleBackButtonClick = () => {
    history.push("/");
  };

  return (
    <MainPageLayout>
      <PageCard width={550} height={630}>
        <Content>
          <Title>Best Top 7</Title>
          {records.map((record, index) => (
            <Card key={index} isTop={index < 3}>
              <Ranking>
                {index + 1}
              </Ranking>
              <div>{record.username}</div>
              <div>{record.score}</div>
            </Card>
          ))}
          <Button onClick={handleBackButtonClick}>
            BACK
          </Button>
        </Content>
      </PageCard>
    </MainPageLayout>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  width: 80%;
  height: 2.7rem;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-between;
  margin: 0.5rem auto;
  border-radius: 5px;
  border: 1px solid #d6cbbf;
  background: #F3ECE4;
  font-size: 25px;
  box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  
  :hover {
    background: #F9F1EA;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 6%;
  border-radius: 0 0 5px 5px;
  margin-top: 20px;
  background: #e55643;
  color: white;
  border: 0;
  font-size: 20px;
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

const Ranking = styled.h3`
  font-weight: bold;
`;

const Title = styled.h2`
  margin: 20px 0;
  text-align: center;
  font-size: 30px;
`;

export default RecordPage;
