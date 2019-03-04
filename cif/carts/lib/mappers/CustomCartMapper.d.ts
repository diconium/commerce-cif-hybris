import { InputSettings } from '@diconium/commerce-cif-hybris-core';
import { Cart } from '@adobe/commerce-cif-model';
import { CartWsDTO } from '@diconium/commerce-cif-hybris-clients';
import CartMapper from './CartMapper';
export default class CustomCartMapper extends CartMapper {
    constructor(settings: InputSettings);
    mapToEntity(dto: CartWsDTO, entity?: Cart): Cart;
}
//# sourceMappingURL=CustomCartMapper.d.ts.map