import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class GetCartByIdClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CartWsDTO>;
    private buildCartDto;
}
//# sourceMappingURL=GetCartByIdClient.d.ts.map