import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { CartModificationWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CartModificationMapper extends Mapper<any> {
    constructor(settings: InputSettings);
    mapFromEntity(entity: any, mappable?: CartModificationWsDTO): CartModificationWsDTO;
    mapFromInputArgsToActionParameters(mappable: any): any;
    mapToEntity(dto: CartModificationWsDTO, entity?: any): any;
}
//# sourceMappingURL=CartModificationMapper.d.ts.map