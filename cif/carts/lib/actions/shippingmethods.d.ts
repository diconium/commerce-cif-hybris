import { ShippingMethod } from '@adobe/commerce-cif-model';
import { Input, Output } from '@diconium/commerce-cif-hybris-core';
declare function postShippingMethod(input: Input): Promise<Input>;
export declare const post: typeof postShippingMethod;
declare function deleteShippingMethod(input: Input): Promise<Input>;
export declare const del: typeof deleteShippingMethod;
declare function getShippingMethod(input: Input): Promise<Output<ShippingMethod[]>>;
export declare const get: typeof getShippingMethod;
export {};
//# sourceMappingURL=shippingmethods.d.ts.map