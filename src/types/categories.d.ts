export interface ICategoriesDetailsResponse {
  status: string;
  data: IDatum[];
}

export interface IDatum {
  id: number;
  name: string;
  image: string;
  noOfSubcategories: number;
  category_order: number;
  isEnabled: number;
  categoryId: number;
}

export interface IEventDetailsResponse  {

}
