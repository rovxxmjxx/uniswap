import { QueryClient } from 'react-query';
import { AnyOBJ } from './types';

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            suspense: true,
          },
        },
      });

    return client;
  };
})();

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path?: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  let url = `${BASE_URL}${path ?? ''}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += '?' + searchParams.toString();
  }

  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const QueryKeys = {
  TOKEN_INFO: 'TOKEN_INFO',
};
