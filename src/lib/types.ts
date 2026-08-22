export type ApiErrorResponse = {
  error: string;
};

export type ListResponse<T> = {
  results: T[] | null;
};

export type Listing = {
  id: string;
  title?: string;
  description?: string;
  price: number;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  image_urls?: string[];
  size_sqm?: number;
  type_slug?: "land" | "house";
  is_verified?: boolean;
  status?: string;
};

export type SessionResponse = {
  token: string;
  refresh_token: string;
  expires_in: number;
};
