import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { NotFound } from "./pages/notfound/notFound";
import { Main } from "./pages/main/main";
import { Login } from "./pages/login/login";
import { Step1 } from "./pages/signup/step1";
import { Step2 } from "./pages/signup/step2";
import { Step3 } from "./pages/signup/step3";
import { Step4 } from "./pages/signup/step4";
import { Complete } from "./pages/signup/complete";
import { Following } from "./pages/follow/following";
import CategoryPage from "./pages/category/category_page";
import { LiveDetail } from "./pages/livedetail/livedetail";
import { SignupProvider } from "./pages/signup/signup-context";
import { MyPage } from "./pages/mypage/mypage.tsx";

export const AppRoutes: FC = () => (
  <SignupProvider>
    <Routes>
      {/* Auth/Signup routes (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Step1 />} />
      <Route path="/signup/step2" element={<Step2 />} />
      <Route path="/signup/step3" element={<Step3 />} />
      <Route path="/signup/step4" element={<Step4 />} />
      <Route path="/signup/complete" element={<Complete />} />

      {/* Main app routes (with layout) */}
      <Route
        path="/"
        element={
          <Layout>
            <Main />
          </Layout>
        }
      />
      <Route
        path="/category"
        element={
          <Layout>
            <CategoryPage />
          </Layout>
        }
      />
      <Route
        path="/follow"
        element={
          <Layout>
            <Following />
          </Layout>
        }
      />
      <Route
        path="/livedetail"
        element={
          <Layout>
            <LiveDetail />
          </Layout>
        }
      />
      <Route
          path="/mypage"
          element={
            <Layout>
                <MyPage />
            </Layout>
          }
      />
      {/* NotFound for all other routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </SignupProvider>
);
