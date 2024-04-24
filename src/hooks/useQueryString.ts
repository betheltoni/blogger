import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryString = (name: string) => {
    return searchParams.get(name);
  };

  const createQueryString = useCallback(
    (query: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(query, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (params.has(query)) params.delete(query);

      return params.toString();
    },
    [searchParams]
  );

  return {
    router,
    pathname,
    getQueryString,
    createQueryString,
    searchParams,
    deleteQueryString,
  };
};
