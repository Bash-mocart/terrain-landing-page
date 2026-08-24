export type ApiErrorResponse = {
  error: string;
};

export type ListResponse<T> = {
  results: T[] | null;
};

export type ListingSearchResponse = ListResponse<Listing> & {
  total: number;
  new_this_week: number;
  limit: number;
  offset: number;
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
  subtype_slug?: string;
  address?: string;
  certificate_type?: string;
  seller_name?: string;
  created_at?: string;
  verified_at?: string;
  has_payment_plan?: boolean;
};

export type CityCount = {
  city: string;
  state: string;
  plot_count: number;
  new_this_week: number;
};

export type ListingSubtype = {
  slug: string;
  name: string;
};

export type ListingType = {
  slug: string;
  name: string;
  subtypes: ListingSubtype[];
};

export type ListingTaxonomy = {
  types: ListingType[];
};

export type HomeHeroSlide = {
  position: number;
  listing: Listing;
  editorial_copy: string;
};

export type HomeHero = {
  slides: HomeHeroSlide[];
  max_slides: number;
};

export type SessionResponse = {
  token: string;
  refresh_token: string;
  expires_in: number;
};
