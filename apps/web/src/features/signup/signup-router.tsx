import { Routes, Route, useSearchParams } from 'react-router-dom';
import SignupLayout from './signup-layout';
import { Step1 } from './ui/step1';
import { Step2 } from './ui/step2';
import { Step3 } from './ui/step3';
import { Step4 } from './ui/step4';
import { Complete } from './ui/complete';

export const SignupRouter = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  switch (step) {
    case "1": return <Step1 />;
    case "2": return <Step2 />;
    case "3": return <Step3 />;
    case "4": return <Step4 />;
    default: return <Step1 />;
  }
}