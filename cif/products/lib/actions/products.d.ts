import { PagedResponseProduct, Product } from '@adobe/commerce-cif-model';
import { Input, Output } from '@diconium/commerce-cif-hybris-core';
declare function getProductById(input: Input): Promise<Output<Product>>;
export declare const getById: typeof getProductById;
declare function searchProducts(input: Input): Promise<Output<PagedResponseProduct>>;
export declare const search: typeof searchProducts;
export {};
//# sourceMappingURL=products.d.ts.map