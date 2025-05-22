import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { AppRoutes } from './routes';
import './App.css';

export interface AppProps {
  isClipped?: boolean;
}

export const App: React.FC<AppProps> = ({ isClipped = false }) => {
  return (
    <div>
      <Header />
      <Sidebar isClipped={isClipped} />
      <main style={{ marginLeft: '240px', marginTop: '72px', padding: '20px' }}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
