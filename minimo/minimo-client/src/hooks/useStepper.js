import { useState } from 'react';

export default function useStepper(maxStep, minStep = 0) {
  const [currentStep, setCurrentStep] = useState(minStep);

  function moveToPrevStep() {
    setCurrentStep((prev) => {
      if (prev - 1 > minStep) {
        return prev - 1;
      }

      return minStep;
    });
  }

  function moveToNextStep() {
    setCurrentStep((prev) => {
      if (prev + 1 < maxStep) {
        return prev + 1;
      }

      return maxStep;
    });
  }

  return {
    currentStep,
    moveToPrevStep,
    moveToNextStep,
  };
}
