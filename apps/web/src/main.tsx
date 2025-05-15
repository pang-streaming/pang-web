import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from "@repo/ui/theme";
import { Layout } from './components/layout/layout';
import { NotFound } from './pages/notfound/notFound';

import './index.css';
import { Main } from './pages/main/main';
import {Following} from "./pages/follow/following.tsx";
import { LiveDetail } from './pages/livedetail/livedetail.tsx';
import { FakeLogin } from './pages/main/fakelogin.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/follow" element={<Following />} />
            <Route path='/livedetail' element={<LiveDetail />} />
            <Route path='/fakelogin' element={<FakeLogin />} /> 
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);