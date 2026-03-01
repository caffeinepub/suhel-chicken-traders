import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerOrder {
    customerName: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    totalAmount: bigint;
    address: string;
    timestamp: bigint;
    phone: string;
    items: Array<OrderItem>;
}
export interface Product {
    freshToday: boolean;
    stockQty: bigint;
    name: string;
    price: bigint;
}
export interface OrderItem {
    productName: string;
    weightGrams: bigint;
    price: bigint;
}
export enum OrderStatus {
    pending = "pending",
    rejected = "rejected",
    accepted = "accepted"
}
export enum PaymentMethod {
    cod = "cod",
    upI = "upI"
}
export interface backendInterface {
    addOrUpdateProduct(name: string, price: bigint, stockQty: bigint, freshToday: boolean): Promise<void>;
    getAllOrders(): Promise<Array<[bigint, CustomerOrder]>>;
    getAvailableProducts(): Promise<Array<Product>>;
    placeOrder(customerName: string, phone: string, address: string, items: Array<OrderItem>, paymentMethod: PaymentMethod): Promise<[bigint, string]>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
