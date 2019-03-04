import { Input } from '@diconium/commerce-cif-hybris-core';
import { AddressWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class PostBillingAddressClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<AddressWsDTO>;
}
//# sourceMappingURL=PostBillingAddressClient.d.ts.map