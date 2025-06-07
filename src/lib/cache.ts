/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from 'next/cache';

export function createCachedFetcher<T>(
  fetcher: (...args: any[]) => Promise<T>,
  cacheKey: string,
  tags: string[],
  revalidate: number = 300 // 5 minutes default
) {
  return unstable_cache(fetcher, [cacheKey], {
    revalidate,
    tags,
  });
}
