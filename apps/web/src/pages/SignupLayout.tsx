import { Outlet } from 'react-router-dom';

export default function SignupLayout() {
  return (
    <div style={{ backgroundColor: '#000', color: 'white', padding: '40px' }}>
      <img src="/assets/logo.svg" alt="PANG 로고" />
      <h1>회원가입 진행 중...</h1>
      <Outlet />
    </div>
  );
}