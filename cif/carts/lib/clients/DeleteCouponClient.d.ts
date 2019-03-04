import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient, VoucherWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class DeleteCouponClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<VoucherWsDTO>;
}
//# sourceMappingURL=DeleteCouponClient.d.ts.map