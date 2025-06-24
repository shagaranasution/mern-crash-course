export interface SearchImageUnsplashApiResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface UnsplashImage {
  id: string;
  created_at: string; // ISO date string
  likes: number;
  user: User;
  urls: Urls;
  description?: string;
  alt_description?: string;
}

export interface User {
  id: string;
  username: string;
  links: UserLinks;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
