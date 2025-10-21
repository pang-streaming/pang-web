import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@pang/shared/ui";
import StreamingPage from "../pages/streaming/ui";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout type="streamer" />}>
<<<<<<< HEAD
        <Route path="/streaming" element={<StreamingPage />} />
=======
        <Route path="/" element={<StreamingPage />} />
>>>>>>> main
      </Route>
    </Routes>
  );
}

export default App;