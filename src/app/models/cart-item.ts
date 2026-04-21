export interface ICartItem {
  id: number;//id of the order of  each item in the cart
  userId: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image?:string;

}