/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_USER_URL: string;
    readonly VITE_STREAMER_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  } 