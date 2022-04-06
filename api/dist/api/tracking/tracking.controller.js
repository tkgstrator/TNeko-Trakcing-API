"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const request_entity_1 = require("../entities/request.entity");
const tracking_service_1 = require("./tracking.service");
let TrackingController = class TrackingController {
    constructor(service) {
        this.service = service;
    }
    create(request) {
        return this.service.create(request);
    }
    methodNotAllowed() {
        return this.service.methodNotAllowed();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_entity_1.RequestEntity]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrackingController.prototype, "methodNotAllowed", null);
TrackingController = __decorate([
    (0, common_1.Controller)('api/tracking'),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService])
], TrackingController);
exports.TrackingController = TrackingController;
//# sourceMappingURL=tracking.controller.js.map