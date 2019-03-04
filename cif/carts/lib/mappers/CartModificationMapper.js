"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
class CartModificationMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings);
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    /* istanbul ignore next */
    mapFromInputArgsToActionParameters(mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { quantity, quantityAdded, statusCode, entry } = dto;
        const entryNumber = entry && entry.entryNumber || undefined;
        return {
            modification: {
                quantity,
                quantityAdded,
                statusCode,
                cartEntryId: String(entryNumber),
            },
        };
    }
}
exports.default = CartModificationMapper;
//# sourceMappingURL=CartModificationMapper.js.map