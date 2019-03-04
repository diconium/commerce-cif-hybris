import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { ShippingInfo } from '@adobe/commerce-cif-model';
import { DeliveryModeWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class ShippingInfoMapper extends Mapper<ShippingInfo> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        deliveryModeId: any;
    };
    mapFromEntity(entity: ShippingInfo, mappable?: DeliveryModeWsDTO): DeliveryModeWsDTO;
    mapToEntity(dto: DeliveryModeWsDTO, entity?: any): ShippingInfo;
}
//# sourceMappingURL=ShippingInfoMapper.d.ts.map