import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from "@repo/ui/theme";
import { Layout } from './components/layout/layout';
import { NotFound } from './pages/notfound/notFound';

import './index.css';
import { Main } from './pages/main/main';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);