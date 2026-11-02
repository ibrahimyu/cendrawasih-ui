import { StrictMode, useEffect, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider } from '@cendra/ui';
import '@cendra/ui/styles.css';
import './playground.css';
import { Dashboard } from './Dashboard';
import { Gallery } from './Gallery';
import { Order } from './patterns/Order';
import { Orders } from './patterns/Orders';
import { Settings } from './patterns/Settings';
import { Welcome } from './patterns/Welcome';

type Theme = 'system' | 'light' | 'dark';
const pages = {
  dashboard: 'Dashboard', orders: 'List: Orders', order: 'Detail: Order', settings: 'Settings', welcome: 'First run', components: 'Components',
} as const;
const screens = { dashboard: Dashboard, orders: Orders, order: Order, settings: Settings, welcome: Welcome, components: Gallery };
type Page = keyof typeof pages;

function readPage(): Page {
  const hash = location.hash.slice(1);
  return hash in pages ? (hash as Page) : 'dashboard';
}

// ?theme=light or ?theme=dark, applied before the first paint so nothing transitions on load
const themeParam = new URLSearchParams(location.search).get('theme');
const initialTheme: Theme = themeParam === 'light' || themeParam === 'dark' ? themeParam : 'system';
if (initialTheme !== 'system') document.documentElement.dataset.theme = initialTheme;

function App() {
  const [page, setPage] = useState(readPage);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const Screen = screens[page];

  useEffect(() => {
    const onHash = () => { setPage(readPage()); scrollTo(0, 0); };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  useLayoutEffect(() => {
    if (theme === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <ToastProvider><Screen /></ToastProvider>
      <div className="pg-bar">
        <label>
          Screen
          <select value={page} onChange={(e) => { location.hash = e.target.value; }}>
            {Object.entries(pages).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </select>
        </label>
        <label>
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            <option value="system">System</option>
            <option value="light">Day</option>
            <option value="dark">Night</option>
          </select>
        </label>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
