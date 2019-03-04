import { InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Category } from '@adobe/commerce-cif-model';
import { CategoryWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CategoryMapper extends Mapper<Category> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): void;
    mapFromEntity(entity: any, mappable?: CategoryWsDTO): CategoryWsDTO;
    mapToEntity(dto: CategoryWsDTO, entity?: any): Category;
}
//# sourceMappingURL=CategoryMapper.d.ts.map