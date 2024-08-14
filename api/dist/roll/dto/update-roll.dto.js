"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRollDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_roll_dto_1 = require("./create-roll.dto");
class UpdateRollDto extends (0, mapped_types_1.PartialType)(create_roll_dto_1.CreateRollDto) {
}
exports.UpdateRollDto = UpdateRollDto;
//# sourceMappingURL=update-roll.dto.js.map