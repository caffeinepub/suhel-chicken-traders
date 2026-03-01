import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    available: boolean;
    price: bigint;
}
export interface backendInterface {
    addOrUpdateProduct(name: string, price: bigint, available: boolean): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAvailableProducts(): Promise<Array<Product>>;
    getSortedProductsByPrice(): Promise<Array<Product>>;
    removeProduct(name: string): Promise<void>;
}
