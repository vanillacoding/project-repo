import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

function getStatus(stepNumber, currentStepNumber) {
  switch (true) {
    case (stepNumber === currentStepNumber):
      return 'active';
    case (stepNumber < currentStepNumber):
      return 'done';
    default:
      return 'none';
  }
}

export default function Stepper({
  steps,
  currentStep,
}) {
  const minStep = steps[0].step;
  const maxStep = steps[steps.length - 1].step;

  return (
    <Container>
      <StepsContainer>
        {steps.map(({ step, label }) => (
          <Step key={step}>
            <Circle
              status={getStatus(step, currentStep)}
            >
              <span>{step}</span>
            </Circle>
            <Label>{label}</Label>
            <Bar isLeft={step > minStep} />
            <Bar isRight={step < maxStep} />
          </Step>
        ))}
      </StepsContainer>
    </Container>
  );
}

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};

const StepsContainer = styled.div`
  height: 100px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  all: unset;
  border-radius: 50%;
  background-color: grey;
  cursor: pointer;

  &:hover {
    background-color: darkgray;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Step = styled.div`
  position: relative;
  padding: 24px;
  width: -webkit-fill-available;
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  background: #9E9E9E;
  border-radius: 50%;
  text-align: center;
  line-height: 2em;
  font-size: 12px;
  font-weight: bolder;
  color: white;

  ${({ status }) => status === 'active' && css`
      background: rgb(33, 150, 243);
    `};
`;

const Label = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: normal;
  color: grey;
`;

const Bar = styled.div`
  position: absolute;
  top: 36px;
  height: 1px;
  border-top: 1px solid #BDBDBD;

  ${({ isLeft }) => isLeft && css`
    left: 0;
    right: 50%;
    margin-right: 20px;
  `};

  ${({ isRight }) => isRight && css`
    right: 0;
    left: 50%;
    margin-left: 20px;
  `};
`;
