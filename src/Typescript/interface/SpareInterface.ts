export interface items{
    image:string,
    name:string,
    brand:string,
    description:string,
    price:string
}

export interface Sparestate{
     loading: boolean;
  error: string | null;
    items:items[]
}