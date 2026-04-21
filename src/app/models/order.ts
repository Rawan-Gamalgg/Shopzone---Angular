import { IOrderItem } from "./order-item";
import { IShippingInfo } from "./shipping-info.model";

export interface IOrder {
    id: number;
    userId: number;
    items: IOrderItem[];
    total: number;
    orderDate: Date;
    status:'pending' | 'processing' | 'delivered' | 'cancelled';
    shippingInfo?: IShippingInfo;


}