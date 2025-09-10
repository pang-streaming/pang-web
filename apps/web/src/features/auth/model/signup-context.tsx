import { createContext, useContext, useState } from "react";

interface SignupData {
  email: string;
  id: string;
  password: string;
}

interface SignupContextType {
  signupData: SignupData;
  setSignupData: (data: Partial<SignupData>) => void;
}

const SignupContext = createContext<SignupContextType | null>(null);

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [signupData, setSignupDataState] = useState<SignupData>({
    email: "",
    id: "",
    password: "",
  });

  const setSignupData = (data: Partial<SignupData>) => {
    setSignupDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("SignupProvider로 감싸야 합니다.");
  return context;
};