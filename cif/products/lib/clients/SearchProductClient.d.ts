import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient } from '@diconium/commerce-cif-hybris-clients';
import { PagedResponseProduct } from '@adobe/commerce-cif-model';
export default class SearchProductClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<PagedResponseProduct>;
    private buildQueryParameters;
}
//# sourceMappingURL=SearchProductClient.d.ts.map