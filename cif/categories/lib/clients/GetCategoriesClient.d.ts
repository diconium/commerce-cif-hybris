import { Input } from '@diconium/commerce-cif-hybris-core';
import { CatalogVersionWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class GetCategoriesClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CatalogVersionWsDTO>;
}
//# sourceMappingURL=GetCategoriesClient.d.ts.map