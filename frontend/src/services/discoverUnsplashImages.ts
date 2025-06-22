/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '@/lib/api';
import type { SearchApiResponse } from '@/types/unsplash-api.types';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function discoverUnsplashImages(
  q: string
): Promise<SearchApiResponse> {
  const headers = {
    Authorization: `Client-ID ${accessKey ?? ''}`,
  };

  return api<SearchApiResponse>(
    `https://api.unsplash.com/search/photos?query=${q}`,
    { headers },
    {
      skipAppResponseShape: true,
    }
  );
}
