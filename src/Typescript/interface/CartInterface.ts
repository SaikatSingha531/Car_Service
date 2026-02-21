export interface cartItems{
    id:string,
    image:string,
    name:string,
    brand:string,
    description:string,
    price:string,
    quantity:number
}

export interface CartState{
    cartProduct:cartItems[],
    count:number
}