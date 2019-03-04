import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient, PaymentDetailsListWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class GetPaymentMethodsClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<PaymentDetailsListWsDTO>;
}
//# sourceMappingURL=GetPaymentMethodsClient.d.ts.map