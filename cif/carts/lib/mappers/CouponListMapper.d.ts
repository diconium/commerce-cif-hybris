import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Coupon } from '@adobe/commerce-cif-model';
import { VoucherListWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CouponListMapper extends Mapper<Coupon[]> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: VoucherListWsDTO, entity?: any): any[];
}
//# sourceMappingURL=CouponListMapper.d.ts.map