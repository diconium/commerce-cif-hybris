import { Input } from '@diconium/commerce-cif-hybris-core';
import { HttpClient, VoucherWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class PostCouponClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<VoucherWsDTO>;
}
//# sourceMappingURL=PostCouponClient.d.ts.map