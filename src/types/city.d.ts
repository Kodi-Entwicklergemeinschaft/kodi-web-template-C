export interface ICity {
  id: number;
  name: string;
  type: string;
  description: string;
  subtitle: string;
  image: string;
  latitude: string;
  longitude: string;
  openUntil: string;
  isActive: number;
  parentId: number;
  // ...any other fields from the response
}

export interface ICities {
  data: ICity[];
}
