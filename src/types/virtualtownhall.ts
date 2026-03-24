export interface VTH {
  status: string;
  data: DistrictAdmin;
}
export interface MunicipalityApiResponse {
  status: string;
  data: Municipality;
}

export interface MeinOrtApiResponse {
  status: string;
  data: Municipality[];
}

export interface CityApiResponse {
  status: string;
  data: City[];
}

export interface CityByIdApiResponse {
  status: string;
  data: City
}

export interface DistrictAdmin {
  id: number;
  name: string;
  type: 'district_admin';
  connectionString: string;
  isAdminListings: boolean | null;
  image: string;
  description: string | null;
  subtitle: string | null;
  mapImage: string | null;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string;
  websiteUrl: string | null;
  openUntil: string;
  isActive: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  inCityServer: boolean | null;
  hasForum: boolean | null;
  parentId: number | null;
  onlineServices: OnlineService[];
  municipalities: Municipality[];
  sourceId?: number;
  
}
export interface OnlineService {
  id: number;
  title: string;
  description: string | null;
  linkUrl: string;
  iconUrl: string;
  displayOrder: number;
  isActive: number;
}

export interface City {
  id: number;
  name: string;
  type: string;
  connectionString: string | null;
  isAdminListings: boolean | null;
  image: string;
  description: string;
  subtitle: string;
  mapImage: string | null;
  address: string | null;
  latitude: string;
  longitude: string;
  phone: string | null;
  email: string | null;
  websiteUrl: string | null;
  openUntil: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  inCityServer: boolean | null;
  hasForum: boolean | null;
  parentId: number;
  onlineServices: OnlineService[];
  topFiveCities: City[];
  sourceId?: number;
  isFavorite?: boolean;
  mayor_name?: string;
  mayor_image?: string;
  mayor_description?: string;
}

export interface Municipality {
  id: number;
  name: string;
  type: string;
  connectionString: string | null;
  isAdminListings: boolean | null;
  image: string;
  description: string;
  subtitle: string | null;
  mapImage: string;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string | null;
  websiteUrl: string;
  openUntil: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  inCityServer: boolean | null;
  hasForum: boolean | null;
  parentId: number;
  onlineServices: OnlineService[];
  topFiveCities: City[];
  sourceId?: number;
  isFavorite?: boolean;
}