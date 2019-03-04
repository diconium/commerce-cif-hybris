import { Input } from '@diconium/commerce-cif-hybris-core';
import { CartModificationWsDTO, HttpClient } from '@diconium/commerce-cif-hybris-clients';
export default class PutCartEntryClient extends HttpClient {
    constructor(input: Input);
    exec(): Promise<CartModificationWsDTO>;
}
//# sourceMappingURL=PutCartEntryClient.d.ts.map