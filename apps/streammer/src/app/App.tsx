import {Route, Routes} from 'react-router-dom';
import {AuthLayout, CustomThemeProvider, DefaultLayout} from "@pang/shared/ui";

function App() {
    return (
        <CustomThemeProvider>
            <Routes>
                <Route element={<DefaultLayout type={'streamer'} />}>
                    <Route path="/" element={<h1>홈</h1>} />
                    <Route path="/explore" element={<h1>Explore</h1>} />
                    <Route path="/category" element={<h1>카테고리</h1>} />
                    <Route path="/follow" element={<h1>팔로우</h1>} />
                    <Route path="/cash" element={<h1>펑</h1>} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<h1>로그인 페이지</h1>} />
                    <Route path="/signup" element={<h1>회원가입 페이지</h1>} />
                </Route>
            </Routes>
        </CustomThemeProvider>
)
}

export default App
