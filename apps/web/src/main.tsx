import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { theme } from "@repo/ui/theme";
import { Layout } from "./components/layout/layout";
import { NotFound } from "./pages/notfound/notFound";
import "./index.css";
import { Main } from "./pages/main/main";
import { Step1 } from "./pages/signup/step1";
import { Step2 } from "./pages/signup/step2";
import { Step3 } from "./pages/signup/step3";
import { Step4 } from "./pages/signup/step4";
import { Complete } from "./pages/signup/complete";
import { Login } from "./pages/login/login";
import CategoryPage from "./pages/category/category_page";

// import { SignupSuccess } from './pages/signup/signupSuccess'

const App = () => {
  const location = useLocation();
  const ignoreLayoutPaths = [
    "/login",
    "/signup",
    "/signup/step2",
    "/signup/step3",
    "/signup/step4",
    "/signup/complete",
  ];

  const isLayout = !ignoreLayoutPaths.includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      {isLayout ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Step1 />} />
          <Route path="/signup/step2" element={<Step2 />} />
          <Route path="/signup/step3" element={<Step3 />} />
          <Route path="/signup/step4" element={<Step4 />} />
          <Route path="/signup/complete" element={<Complete />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
