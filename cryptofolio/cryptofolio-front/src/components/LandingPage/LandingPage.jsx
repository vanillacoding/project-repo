import React, { useState } from "react";
import styled from "styled-components";

import BubbleChart from "../BubbleChart/BubbleChart";

import TypeButton from "../shared/TypeButton/TypeButton";
import { CHART_TYPE } from "../../constants/constants";
import { useSelector } from "react-redux";

const LandingPageContainer = styled.div`
  background-color: black;
  min-height: 87vh;
  padding-top: 30px;
`;

const BubbleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  margin: 0 auto;
`;

const BubbleChartContainer = styled.div`
  margin-top: 20px;
`;

const LandingPage = () => {
  const [type, setType] = useState(CHART_TYPE.EXCHANGE);
  const { isAuthorized } = useSelector((state) => state.authReducer);

  return (
    <LandingPageContainer>
      <BubbleButtonContainer>
        <TypeButton
          name={CHART_TYPE.EXCHANGE}
          onClick={(e) => setType(e.target.name)}
          picked={type === CHART_TYPE.EXCHANGE}
        >
          Exchange
        </TypeButton>
        <TypeButton
          name={CHART_TYPE.CATEGORY}
          onClick={(e) => setType(e.target.name)}
          picked={type === CHART_TYPE.CATEGORY}
        >
          Category
        </TypeButton>
        <TypeButton
          name={CHART_TYPE.PORTFOLIO}
          onClick={(e) => setType(e.target.name)}
          picked={type === CHART_TYPE.PORTFOLIO}
        >
          PortFolio
        </TypeButton>
        {isAuthorized && (
          <TypeButton
            name={CHART_TYPE.MYPORTFOLIO}
            onClick={(e) => setType(e.target.name)}
            picked={type === CHART_TYPE.MYPORTFOLIO}
          >
            My PortFolio
          </TypeButton>
        )}
      </BubbleButtonContainer>
      <BubbleChartContainer>
        <BubbleChart type={type || CHART_TYPE.EXCHANGE} />
      </BubbleChartContainer>
    </LandingPageContainer>
  );
};

export default LandingPage;
