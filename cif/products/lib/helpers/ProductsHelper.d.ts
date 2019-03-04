import { CategoryWsDTO, FacetValueWsDTO, ImageWsDTO, PriceWsDTO, VariantOptionWsDTO } from '@diconium/commerce-cif-hybris-clients';
import { InputSettings, TranslationService } from '@diconium/commerce-cif-hybris-core';
import { Attribute, FacetValue, ProductVariant } from '@adobe/commerce-cif-model';
export declare class ProductsHelper {
    static pushProductVariant(variantOption: VariantOptionWsDTO[], settings: InputSettings): ProductVariant[];
    static pushPrice(price: PriceWsDTO, settings: InputSettings): any[];
    static buildAttributes(dto: any, translationService: TranslationService): Attribute[];
    static buildAttribute(attribute: any, dto: any, translationService: TranslationService): Attribute;
    static buildCategories(categories: CategoryWsDTO[], settings: InputSettings): any[];
    static buildAssets(images: ImageWsDTO[], settings: InputSettings): any[];
    static mapFacetValues(facetValuesDto: FacetValueWsDTO[], settings: InputSettings): FacetValue[];
}
//# sourceMappingURL=ProductsHelper.d.ts.map