import { DTO, InputSettings, Mapper } from '@diconium/commerce-cif-hybris-core';
import { Category } from '@adobe/commerce-cif-model';
import { CategoryHierarchyWsDTO } from '@diconium/commerce-cif-hybris-clients';
export default class CategoryMapper extends Mapper<Category> {
    constructor(settings: InputSettings);
    mapFromInputArgsToActionParameters(mappable: any): {
        categoryId: any;
    };
    mapFromEntity(entity: any, mappable?: DTO): DTO;
    mapToEntity(dto: CategoryHierarchyWsDTO, entity?: any): Category;
}
//# sourceMappingURL=CategoryMapper.d.ts.map