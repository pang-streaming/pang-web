import { Route, Routes, useLocation } from "react-router-dom";
import { NotFound } from "../pages/not-found/page";
import { Explore } from "../pages/explore/page";
import { Category } from "../pages/category/page";
import { Following } from "../pages/following/page";
import { Charge } from "../pages/charge/page";
import { Login } from "../pages/login/page";
import { Step1 } from "../features/signup/ui/step1";
import { Step2 } from "../features/signup/ui/step2";
import { Step3 } from "../features/signup/ui/step3";
import { SignupProvider } from "../features/auth/model/signup-context";
import { Step4 } from "../features/signup/ui/step4";
import { Complete } from "../features/signup/ui/step5";
import { ChattingSection } from "../pages/live-detail/widget/chatting-section";
import { DefaultLayout } from "@pang/shared/ui";
import { LiveDetail } from "@/pages/live-detail/page";

function App() {
  const location = useLocation();
  const noLayoutPaths = [
    "/login",
    "/signup",
    "/signup/step2",
    "/signup/step3",
    "/signup/step4",
    "/signup/complete",
  ];

  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <SignupProvider>
      {isNoLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Step1 />} />
          <Route path="/signup/step2" element={<Step2 />} />
          <Route path="/signup/step3" element={<Step3 />} />
          <Route path="/signup/step4" element={<Step4/>} />
          <Route path="/signup/complete" element={<Complete/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <DefaultLayout>
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/category" element={<Category />} />
          <Route path="/follow" element={<Following />} />
          <Route path="/cash" element={<Charge />} />
          <Route path="/livedetail" element={<LiveDetail/>} />
          //삭제
          <Route path="*" element={<NotFound />} />
        </Routes>
        </DefaultLayout>
      )}
    </SignupProvider>
  );
}

export default App;
