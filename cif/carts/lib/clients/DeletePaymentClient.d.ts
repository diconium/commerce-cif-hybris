import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient, PaymentDetailsWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class DeletePaymentClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<PaymentDetailsWsDTO>;
}
//# sourceMappingURL=DeletePaymentClient.d.ts.map