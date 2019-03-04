import { Category, PagedResponseCategory } from '@adobe/commerce-cif-model';
import { Input, Output } from '@diconium/commerce-cif-hybris-core';
declare function getCategoryById(input: Input): Promise<Output<Category>>;
export declare const getById: typeof getCategoryById;
declare function getCategories(input: Input): Promise<Output<PagedResponseCategory>>;
export declare const get: typeof getCategories;
export {};
//# sourceMappingURL=categories.d.ts.map