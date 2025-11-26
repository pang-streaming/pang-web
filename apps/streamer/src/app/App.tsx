import { Route, Routes } from "react-router-dom";
import { DefaultLayout, AuthLayout, ProtectedLayout } from "@pang/shared/ui";
import StreamingPage from "../pages/streaming/ui";
import { Login } from "../pages/login/page";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route element={<DefaultLayout type="streamer" />}>
          <Route path="/" element={<StreamingPage />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;