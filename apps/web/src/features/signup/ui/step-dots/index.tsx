import {
    StepCircle,
    StepIndicator,
} from "./style";

export const StepDots = ({ activeStep }: { activeStep: number }) => {
    return (
      <StepIndicator>
        {[1, 2, 3, 4].map((step) => (
          <StepCircle key={step} $isActive={step === activeStep} />
        ))}
      </StepIndicator>
    );
  };