import { useEffect } from "react";
import { tokenStorage } from "@pang/shared/lib";

export const Login = () => {
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    
    if (token) {
      window.location.href = "/";
    } else {
      window.location.href = `${import.meta.env.PANG_URL}/login`;
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: '#666'
    }}>
      로그인 확인 중...
    </div>
  );
};

