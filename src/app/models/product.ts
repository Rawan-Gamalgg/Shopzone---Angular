export interface IProduct {
    id:number,
    name:string,
    price:number,
    description?:string,
    category:string,
    stock:number,
    rating:number,
    image:string[],
    //sizes:"1/3"|"5/6"|"7/8"
}
