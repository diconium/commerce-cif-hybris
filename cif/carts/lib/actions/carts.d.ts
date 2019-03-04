import { Cart } from '@adobe/commerce-cif-model';
import { Input, Output } from '@diconium/commerce-cif-hybris-core';
declare function getCartById(input: Input): Promise<Output<Cart>>;
export declare const getById: typeof getCartById;
declare function deleteCart(input: Input): Promise<Output<Cart>>;
export declare const deleteById: typeof deleteCart;
declare function postCart(input: Input): Promise<Input>;
export declare const post: typeof postCart;
export {};
//# sourceMappingURL=carts.d.ts.map