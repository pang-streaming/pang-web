import {Route, Routes} from 'react-router-dom';
import { DonationPage } from '../pages/donation/page';

function App() {
    return (
        <Routes>
            <Route path="/events/donation" element={<DonationPage />} />
        </Routes>
    )
}

export default App
