import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient } from '@diconium/commerce-cif-hybris-clients';
import { Product } from '@adobe/commerce-cif-model';
export default class GetProductByIdClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<Product>;
}
//# sourceMappingURL=GetProductByIdClient.d.ts.map