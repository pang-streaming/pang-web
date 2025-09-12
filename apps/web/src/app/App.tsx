import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/not-found/page";
import { Explore } from "@/pages/explore/page";
import { Category } from "@/pages/category/page";
import { Following } from "@/pages/following/page";
import { Charge } from "@/pages/charge/page";
import { Login } from "@/pages/login/page";
import { Step1 } from "@/features/signup/ui/step1";
import { Step2 } from "@/features/signup/ui/step2";
import { Step3 } from "@/features/signup/ui/step3";
import { SignupProvider } from "@/features/auth/model/signup-context";
import { Step4 } from "@/features/signup/ui/step4";
import { Complete } from "@/features/signup/ui/step5";
import {AuthLayout, DefaultLayout, FullScreenLayout} from "@pang/shared/ui";
import {Home} from "@/pages/home/page";
import { MyPage } from "@/pages/mypage/page";
import { LiveDetail } from "@/pages/live-detail/page";
// import { LiveDetail } from "@/pages/live-detail/page";

function App() {
  return (
    <SignupProvider>
	    <Routes>
		    <Route element={<DefaultLayout type="user" />}>
			    <Route path="/" element={<Home />} />
			    <Route path="/explore" element={<Explore />} />
			    <Route path="/category" element={<Category />} />
			    <Route path="/follow" element={<Following />} />
			    <Route path="/cash" element={<Charge />} />
			    <Route path="/mypage" element={<MyPage />} />
			    {/*<Route path="/livedetail" element={<LiveDetail/>}/>*/}
		    </Route>
		    <Route element={<FullScreenLayout type={"user"} />}>
			    <Route path="/livedetail" element={<LiveDetail />} />
		    </Route>
		    <Route element={<AuthLayout />}>
			    <Route path="/login" element={<Login />} />
			    <Route path="/signup" element={<Step1 />} />
			    <Route path="/signup/step2" element={<Step2 />} />
			    <Route path="/signup/step3" element={<Step3 />} />
			    <Route path="/signup/step4" element={<Step4/>} />
			    <Route path="/signup/complete" element={<Complete/>} />
			    <Route path="*" element={<NotFound />} />
		    </Route>
	    </Routes>
    </SignupProvider>
  );
}

export default App;
