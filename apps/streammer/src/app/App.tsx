import {Route, Routes} from 'react-router-dom';
import {DefaultLayout} from "@pang/shared/ui";
import { DashboardPage } from "@/pages/dashboard";
import { RevenuePage } from "@/pages/revenue";
import { StreamingPage } from "@/pages/streaming";
import { ContentPage } from "@/pages/content";


function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout type={'streamer'} />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/revenue" element={<RevenuePage />} />
                <Route path="/streaming" element={<StreamingPage />} />
                <Route path="/content" element={<ContentPage />} />
            </Route>
        </Routes>
)
}

export default App
