import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Coupon } from '@adobe/commerce-cif-model';
import { VoucherWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CouponMapper extends Mapper<Coupon> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
        code: any;
        couponId: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: VoucherWsDTO, entity?: any): any;
}
//# sourceMappingURL=CouponMapper.d.ts.map