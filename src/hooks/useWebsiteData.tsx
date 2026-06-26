import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { WebsiteData } from '@/types';

interface DataContextType {
  data: WebsiteData | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/website.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load website data');
        return res.json();
      })
      .then((json: WebsiteData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useWebsiteData(): WebsiteData {
  const { data, loading, error } = useContext(DataContext);
  if (loading) throw new Promise(() => {}); // Suspense-like behavior
  if (error) throw new Error(error);
  if (!data) throw new Error('No data available');
  return data;
}

export function useDataContext(): DataContextType {
  return useContext(DataContext);
}
