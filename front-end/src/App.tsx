import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { clearSession, getToken, tokenIsExpired } from './services/session';

function App() {
  const [authenticated, setAuthenticated] = useState(() => Boolean(getToken()) && !tokenIsExpired());
  const [loginOpen, setLoginOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => { const expired = () => { setAuthenticated(false); setLoginOpen(false); setShowResults(false); }; window.addEventListener('trampolim:session-expired', expired); return () => window.removeEventListener('trampolim:session-expired', expired); }, []);
  const requestResults = () => { setShowResults(true); if (!authenticated) setLoginOpen(true); };
  const logout = () => { clearSession(); setAuthenticated(false); setShowResults(false); };
  if (loginOpen) return <AuthPage onBack={() => setLoginOpen(false)} onAuthenticated={() => { setAuthenticated(true); setLoginOpen(false); }} />;
  return <Home authenticated={authenticated} showResults={showResults} onResultsRequested={requestResults} onLogout={logout} />;
}
export default App;
