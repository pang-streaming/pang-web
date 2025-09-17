import {Route, Routes} from 'react-router-dom';
import { DonationPage } from '../pages/donation/page';
import { ChatPage } from '../pages/chat/page';

function App() {
    return (
        <Routes>
            <Route path="/events/donation" element={<DonationPage />} />
            <Route path="/events/chat" element={<ChatPage />} />
        </Routes>
    )
}

export default App
