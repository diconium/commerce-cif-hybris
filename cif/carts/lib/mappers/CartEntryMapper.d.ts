import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { CartEntry } from '@adobe/commerce-cif-model';
import { OrderEntryWsDTO, ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CartEntryMapper extends Mapper<CartEntry> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        cartEntryId: any;
        entry: OrderEntryWsDTO;
    };
    mapFromEntity(entity: any, mappable?: OrderEntryWsDTO): OrderEntryWsDTO;
    mapToEntity(dto: OrderEntryWsDTO, entity?: any): CartEntry;
    mapProductVariant(product: ProductWsDTO): any;
}
//# sourceMappingURL=CartEntryMapper.d.ts.map