import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { ShippingMethod } from '@adobe/commerce-cif-model';
import { DeliveryModeWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class ShippingMethodMapper extends Mapper<ShippingMethod> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: ShippingMethod, mappable?: DeliveryModeWsDTO): DeliveryModeWsDTO;
    mapToEntity(dto: DeliveryModeWsDTO, entity?: any): ShippingMethod;
}
//# sourceMappingURL=ShippingMethodMapper.d.ts.map