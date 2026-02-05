import { useState, useEffect, useCallback } from "react";

interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<T>,
  deps: unknown[] = [],
): QueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, isLoading, refetch: fetch };
}
