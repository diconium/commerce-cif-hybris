import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { ProductVariant } from '@adobe/commerce-cif-model';
import { ProductWsDTO, VariantOptionWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class ProductVariantMapper extends Mapper<ProductVariant> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: ProductWsDTO): ProductWsDTO;
    mapToEntity(dto: VariantOptionWsDTO, entity?: any): ProductVariant;
    mapAttribute(attribute: any): any;
    getVariantName(variantOptionQualifiers: any): string;
}
//# sourceMappingURL=ProductVariantMapper.d.ts.map