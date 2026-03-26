export interface items {
  $id: string;
  image: string;
  name: string;
  duration: string;
  category: string;
  description: string;
  price: string;
}

export interface Servidestate {
  loading: boolean;
  error: string | null;
  items: items[];
}
