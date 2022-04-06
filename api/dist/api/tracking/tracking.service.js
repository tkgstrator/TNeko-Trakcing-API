"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const resposne_entity_1 = require("../entities/resposne.entity");
let TrackingService = class TrackingService {
    async create(request) {
        const url = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';
        const parameters = new URLSearchParams();
        request.tracking_id.forEach((tracking_id, index) => {
            parameters.append(`number${String(index + 1).padStart(2, '0')}`, request.tracking_id[index].toString());
        });
        const response = await axios_1.default.post(url, parameters);
        return new resposne_entity_1.ResponseEntity(response.data);
    }
    methodNotAllowed() {
        throw new common_1.HttpException('Method Not Allowed', common_1.HttpStatus.METHOD_NOT_ALLOWED);
    }
};
TrackingService = __decorate([
    (0, common_1.Injectable)()
], TrackingService);
exports.TrackingService = TrackingService;
//# sourceMappingURL=tracking.service.js.map