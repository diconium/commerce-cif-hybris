import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Cart } from '@adobe/commerce-cif-model';
import { CartWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CartMapper extends Mapper<Cart> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        productVariantId: any;
        quantity: any;
        curr: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: CartWsDTO, entity?: Cart): Cart;
}
//# sourceMappingURL=CartMapper.d.ts.map