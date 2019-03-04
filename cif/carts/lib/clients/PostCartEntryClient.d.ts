import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartModificationWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class PostCartEntryClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CartModificationWsDTO>;
}
//# sourceMappingURL=PostCartEntryClient.d.ts.map