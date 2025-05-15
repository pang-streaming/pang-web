import { Routes, Route } from 'react-router-dom';
import SignupLayout from './SignupLayout';
import { Step1 } from './signup/step1';
import { Step2 } from './signup/step2';
import { Step3 } from './signup/step3';
import { Step4 } from './signup/step4';
import { Complete }from './signup/complete';


export default function SignupRouter() {
    return (
        <Routes>
            <Route path="/signup" element={<SignupLayout />}>
                <Route index element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/step4" element={<Step4 />} />
                <Route path="/complete" element={<Complete />} />
            </Route>
        </Routes>
    );
}