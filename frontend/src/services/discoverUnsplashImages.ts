/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '@/lib/api';
import type { SearchImageUnsplashApiResponse } from '@/types/unsplash-api.types';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function discoverUnsplashImages(
  q: string
): Promise<SearchImageUnsplashApiResponse> {
  const headers = {
    Authorization: `Client-ID ${accessKey ?? ''}`,
  };

  return api<SearchImageUnsplashApiResponse>(
    `https://api.unsplash.com/search/photos?query=${q}`,
    { headers },
    {
      skipAppResponseShape: true,
    }
  );
}
