import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Product } from '@adobe/commerce-cif-model';
import { ProductWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class ProductMapper extends Mapper<Product> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        id: any;
    };
    mapFromEntity(entity: any, mappable?: ProductWsDTO): ProductWsDTO;
    mapToEntity(dto: ProductWsDTO, entity?: any): Product;
}
//# sourceMappingURL=ProductMapper.d.ts.map