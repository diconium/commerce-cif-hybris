import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class DeleteCartClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CartWsDTO>;
}
//# sourceMappingURL=DeleteCartClient.d.ts.map