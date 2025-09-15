import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/not-found/page";
import { Explore } from "@/pages/explore/page";
import { Category } from "@/pages/category/page";
import { Following } from "@/pages/following/page";
import { Charge } from "@/pages/charge/page";
import { Login } from "@/pages/login/page";
import { Complete } from "@/features/signup/ui/complete";
import { AuthLayout, DefaultLayout } from "@pang/shared/ui";
import { Home } from "@/pages/home/page";
import { MyPage } from "@/pages/mypage/page";
import { LiveDetail } from "@/pages/live-detail/page";
import { Market } from "@/pages/market/page";
import { MarketDetail } from "@/pages/market-detail/page";
import { ProfilePage } from "@/pages/profile/page";
import { SignupRouter } from "@/features/signup/signup-router";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout type="user" />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/category" element={<Category />} />
        <Route path="/follow" element={<Following />} />
        <Route path="/cash" element={<Charge />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market-detail" element={<MarketDetail />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<DefaultLayout type={"user"} full />}>
        <Route path="/livedetail" element={<LiveDetail />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupRouter />} />
        <Route path="/complete" element={<Complete />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
