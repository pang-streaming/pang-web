import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@pang/shared/ui";
import StreamingPage from "../pages/streaming/ui";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout type="streamer" />}>
        <Route path="/" element={<StreamingPage />} />
      </Route>
    </Routes>
  );
}

export default App;