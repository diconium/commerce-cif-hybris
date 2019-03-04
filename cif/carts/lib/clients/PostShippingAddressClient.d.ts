import { Input } from '@diconium/commerce-cif-hybris-core';
import { AddressWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class PostShippingAddressClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<AddressWsDTO>;
}
//# sourceMappingURL=PostShippingAddressClient.d.ts.map