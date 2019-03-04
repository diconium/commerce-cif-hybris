import { Input } from '@diconium/commerce-cif-hybris-core';
import { DeliveryModeListWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class GetShippingMethodsClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<DeliveryModeListWsDTO>;
}
//# sourceMappingURL=GetShippingMethodsClient.d.ts.map