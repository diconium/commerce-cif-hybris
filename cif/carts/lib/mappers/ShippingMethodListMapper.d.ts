import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { ShippingMethod } from '@adobe/commerce-cif-model';
import { DeliveryModeListWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class ShippingMethodListMapper extends Mapper<ShippingMethod[]> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: DeliveryModeListWsDTO, entity?: any): ShippingMethod[];
}
//# sourceMappingURL=ShippingMethodListMapper.d.ts.map