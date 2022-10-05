import React, { useContext } from 'react';
import styled from 'styled-components';
import * as ICON from 'react-feather';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';
import PublishForm from '../PublishForm';
import Templates from '../Templates';
import Stepper from '../shared/Stepper';
import useStepper from '../../hooks/useStepper';
import { ProjectContext } from '../../contexts/ProjectContext';

const STEPS = [
  {
    step: 0,
    label: 'Select a template',
    content: Templates,
  },
  {
    step: 1,
    label: 'Edit your project',
    content: Editor,
  },
  {
    step: 2,
    label: 'Preview',
    content: Preview,
  },
  {
    step: 3,
    label: 'Publish',
    content: PublishForm,
  },
];

export default function ProjectFormStepper() {
  const { project } = useContext(ProjectContext);

  const { currentStep, moveToNextStep, moveToPrevStep } = useStepper(STEPS.length);
  const Content = STEPS[currentStep].content;

  return (
    <>
      <StepperContainer>
        <Button onClick={moveToPrevStep}>
          <ICON.ArrowLeftCircle color='white' />
        </Button>
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
        />
        <Button
          onClick={moveToNextStep}
          disabled={!project}
        >
          <ICON.ArrowRightCircle color='white' />
        </Button>
      </StepperContainer>
      <Content />
    </>
  );
}

const Button = styled.button`
  all: unset;
  border-radius: 50%;
  background-color: grey;
  cursor: pointer;

  &:hover {
    background-color: darkgray;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StepperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
