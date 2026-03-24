export interface IUserDetailsResponse {
  status: string;
  data: IUserDatum;
}

export interface IUserDatum {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  phoneNumber: number;
  latitude: number;
  longitude: number;
  radius: number;
  roleId: number;
  socialMedia: string;
  website: string;
  description: string;
}

export interface City {
  id: number;
  name: string;
  parentCity: ParentCity | null;
}

export interface ParentCity {
  id: number;
  name: string;
}
