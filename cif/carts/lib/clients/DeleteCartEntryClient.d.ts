import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class DeleteCartEntryClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CartWsDTO>;
}
//# sourceMappingURL=DeleteCartEntryClient.d.ts.map