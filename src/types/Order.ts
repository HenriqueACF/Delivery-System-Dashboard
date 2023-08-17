import {OrderStatus} from './OrserStatus'
import {Address} from "./Address";
import {CartItem} from "@/types/CartItem";

export type Order = {
    id: number
    status: OrderStatus
    orderDate: string
    userid: string
    userName?: string
    shippingAddress: Address
    shippingPrice: number
    paymentType: 'card' | 'money'
    changeValue?: number
    cupom?: string
    cupomDiscount?: number
    products: CartItem[]
    subtotal: number
    total: number
}
