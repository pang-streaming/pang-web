import { Routes, Route } from 'react-router-dom';
import SignupLayout from './signup-layout';
import { Step1 } from './ui/step1';
import { Step2 } from './ui/step2';
import { Step3 } from './ui/step3';


export default function SignupRouter() {
    return (
        <Routes>
            <Route path="/signup" element={<SignupLayout />}>
                <Route index element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/step4" element={<></>} />
                <Route path="/complete" element={<></>} />
            </Route>
        </Routes>
    );
}