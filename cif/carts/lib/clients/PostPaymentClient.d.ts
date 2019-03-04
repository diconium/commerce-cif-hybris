import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient, PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PostPaymentClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<PaymentDetailsWsDTO>;
    private getAddressesDto;
    private getBillingAddress;
    private isBillingAddress;
}
//# sourceMappingURL=PostPaymentClient.d.ts.map