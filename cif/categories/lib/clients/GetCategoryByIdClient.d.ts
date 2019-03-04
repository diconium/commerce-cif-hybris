import { Input } from '@diconium/commerce-cif-hybris-core';
import { CategoryHierarchyWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class GetCategoryByIdClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CategoryHierarchyWsDTO>;
}
//# sourceMappingURL=GetCategoryByIdClient.d.ts.map