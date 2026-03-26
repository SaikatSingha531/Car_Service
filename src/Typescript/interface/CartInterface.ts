export interface cartItems {
    $id: string;
  image: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cartProduct: cartItems[];
  count: number;
}

// For Service cart ---------

export interface ServiceItems {
  $id: string;        
  image: string;
  name: string;
  category: string;
  duration: number;    
  description: string;
  price: number; 
  quantity: number;
}

export interface SeviceState {
  serviceProduct: ServiceItems[];
  count: number;
}
