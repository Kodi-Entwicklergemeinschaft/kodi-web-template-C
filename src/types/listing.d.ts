export interface IHiglightsDetailsSections {
  status: string;
  data: IDatum[];
}

export interface IEventDetailsSections {
  status: string;
  data: IDatum;
}

export interface  IDatum {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  userId: number;
  startString: string | null;
  endString: string | null;
  statusId: number;
  categoryId: number;
  subcategoryId: null;
  showExternal: null;
  appointmentId: null;
  viewCount: null;
  externalId: null;
  expiryString: string | null;
  sourceId: number;
  website: string;
  address: string;
  email: string;
  phone: string;
  zipcode: number;
  pdf: null;
  cityId: number;
  cityCount: number;
  allCities: number[];
  logo: string;
  logoCount: number;
  otherLogos: IOtherLogo[];
  place: string;
  longitude: number;
  latitude: number;
  villageId: null;
  startDate: null;
  endDate: null;
  createdAt: Date;
  pdf: null;
  expiryDate: null;
  updatedAt: Date;
  isNews?: boolean;
  isFavorite?: boolean;
  sourceId?: number;
}

export interface IOtherLogo {
  id: number;
  logo: string;
  listingId: number;
  imageOrder: number;
}

export enum EventCardVariant {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}
export type IEventCardProps = Partial<IDatum> & { variant: EventCardVariant, date?: string}
