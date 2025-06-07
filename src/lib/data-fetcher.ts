export type FetchResult<T> = {
  data: T | null;
  error: string | null;
};

export async function safeFetch<T>(
  fetcher: () => Promise<T>,
  errorMessage: string
): Promise<FetchResult<T>> {
  try {
    const data = await fetcher();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : errorMessage;
    console.error(errorMessage, err);
    return { data: null, error };
  }
}
