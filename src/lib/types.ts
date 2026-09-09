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
  owner_id?: string;
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

export type PublicSellerProfile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  seller_type?: string;
  kyc_verified?: boolean;
  verified_at?: string;
  joined_at?: string;
  instagram_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  website_url?: string;
  listings_count?: number;
  company_name?: string;
  company_logo_url?: string;
  company_verified?: boolean;
};

export type MapMarker = {
  id: string;
  lng: number;
  lat: number;
  price: number;
  type: string;
  verified: boolean;
  state?: string;
  type_slug?: "land" | "house";
  building_3d_url?: string;
  building_3d_yaw_deg?: number;
  building_3d_default_scale?: number;
  building_3d_scale_override?: number;
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

export type AuthUser = {
  id: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  role: string;
  kyc_verified: boolean;
  seller_type?: string;
  created_at?: string;
};

export type PhoneAccountStatus = "new" | "unverified" | "verified";

export type PhoneCheckResponse = {
  status: PhoneAccountStatus;
};

export type OtpRequestResponse = {
  channel: "sms" | "whatsapp";
  expires_in_seconds: number;
  dev_code?: string;
};

export type AuthSessionResponse = SessionResponse & {
  user: AuthUser;
  is_new_user: boolean;
};
