import { ROLE } from '../enums/role.enums';
export declare const ACCESS_KEY = "roles";
export declare const Access: (...role: ROLE[]) => import("@nestjs/common").CustomDecorator<string>;
