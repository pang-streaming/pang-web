import { Routes, Route, useSearchParams, redirect, useNavigate } from 'react-router-dom';
import SignupLayout from './signup-layout';
import { Step1 } from './ui/step1';
import { Step2 } from './ui/step2';
import { Step3 } from './ui/step3';
import { Step4 } from './ui/step4';
import { Complete } from './ui/complete';
import { useRegisterStore } from '../auth/store/register-store';
import { useEffect } from 'react';

export const SignupRouter = () => {
  const { step: storeStep, reset } = useRegisterStore();
  const navigate = useNavigate();

  
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  useEffect(()=>{
    if (String(storeStep) != step)  {
      reset();
      navigate("/signup?step=1");
      return 
    }
  },[step])

  switch (step) {
    case "1": return <Step1 />;
    case "2": return <Step2 />;
    case "3": return <Step3 />;
    case "4": return <Step4 />;
    default: return <Step1 />;
  }
}