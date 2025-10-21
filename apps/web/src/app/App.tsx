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
import { MarketDetail } from "@/pages/market/page/market-detail/page";
import { ProfilePage } from "@/pages/profile/page";
import { SignupRouter } from "@/features/signup/signup-router";
import { CategoryDetail } from "@/pages/category-detail/page";
import { RecentVideo } from "@/pages/mypage/widget/settings-menu/widget/recent-video";
import { GiftList } from "@/pages/mypage/widget/settings-menu/widget/gift-list";
import { StoreDetail } from "@/pages/market/page/store-detail/page";
import { MarketCategoryDetail } from "@/pages/market/page/market-category-detail";
import { CommunityDetail } from "@/pages/profile/page/community-detail/page";
import { FollowingList } from "@/pages/mypage/widget/settings-menu/widget/following-list";
import { Search } from "@/pages/search/page";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout type="user" />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category" element={<Category />} />
		<Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="/follow" element={<Following />} />
        <Route path="/cash" element={<Charge />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market-detail" element={<MarketDetail />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/gift-list" element={<GiftList />} />
        <Route path="/recent-video" element={<RecentVideo />} />
		<Route path="/store-detail/:storeId" element={<StoreDetail />} />
		<Route path="/market-category-detail/:title" element={<MarketCategoryDetail />} />
		<Route path="/community-detail/:id" element={<CommunityDetail />} />
		<Route path="/following-list" element={<FollowingList />} />

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
