import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './provider'
import App from "./App";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </StrictMode>
)
