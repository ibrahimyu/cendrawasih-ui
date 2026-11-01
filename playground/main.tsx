import { StrictMode, useEffect, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@cendra/ui/styles.css';
import './playground.css';
import { Dashboard } from './Dashboard';
import { Gallery } from './Gallery';

type Theme = 'system' | 'light' | 'dark';
const pages = { dashboard: 'Dashboard', components: 'Components' } as const;
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

  useEffect(() => {
    const onHash = () => setPage(readPage());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  useLayoutEffect(() => {
    if (theme === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <div className="pg-bar">
        <nav aria-label="Playground">
          {Object.entries(pages).map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
        <label>
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            <option value="system">System</option>
            <option value="light">Day</option>
            <option value="dark">Night</option>
          </select>
        </label>
      </div>
      {page === 'dashboard' ? <Dashboard /> : <Gallery />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
