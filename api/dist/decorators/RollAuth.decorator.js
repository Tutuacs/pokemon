"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollAuth = void 0;
const common_1 = require("@nestjs/common");
exports.RollAuth = (0, common_1.createParamDecorator)((filterData, context) => {
    const request = context.switchToHttp().getRequest();
    if (request.rolls) {
        if (filterData) {
            if (filterData === 'chances') {
                const chances = {
                    ...request.rolls,
                };
                return chances;
            }
            return request.rolls[filterData];
        }
        else {
            return request.rolls;
        }
    }
    else {
        throw new common_1.ForbiddenException('Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário');
    }
});
//# sourceMappingURL=RollAuth.decorator.js.map