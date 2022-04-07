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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingResponse = exports.SummaryResponse = exports.DetailResponse = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const node_html_parser_1 = require("node-html-parser");
const swagger_1 = require("@nestjs/swagger");
class DetailResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DetailResponse.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DetailResponse.prototype, "branch_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DetailResponse.prototype, "arrival_date", void 0);
exports.DetailResponse = DetailResponse;
class SummaryResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SummaryResponse.prototype, "tracking_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SummaryResponse.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SummaryResponse.prototype, "estimate_arrival_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DetailResponse] }),
    (0, class_transformer_1.Type)(() => DetailResponse),
    __metadata("design:type", Array)
], SummaryResponse.prototype, "details", void 0);
exports.SummaryResponse = SummaryResponse;
class TrackingResponse {
    constructor(html) {
        const root = (0, node_html_parser_1.parse)(html);
        const blocks = root.querySelectorAll(".parts-tracking-invoice-block");
        const results = blocks.map((block) => {
            let trackingId = block.querySelector(".tracking-invoice-block-title").rawText;
            const re = new RegExp("(\\d{4}-\\d{4}-\\d{4})");
            if (!re.test(trackingId)) {
                throw new common_1.HttpException("Tracking Id must be provided 12 digets.", common_1.HttpStatus.BAD_REQUEST);
            }
            trackingId = trackingId.match(re)[0];
            const stateTitle = block.querySelector(".tracking-invoice-block-state-title").rawText;
            const stateSummary = block.querySelector(".tracking-invoice-block-state-summary").rawText;
            const stateNote = block.querySelector(".tracking-invoice-block-state-note").rawText;
            const blockSummary = block.querySelector(".tracking-invoice-block-summary");
            const productSummaries = blockSummary.querySelectorAll(".data");
            const productName = productSummaries[0].rawText;
            const productDate = productSummaries[1].rawText;
            const blockDetails = block.querySelector(".tracking-invoice-block-detail");
            const details = blockDetails.querySelectorAll("li").map((detail) => {
                const response = new DetailResponse();
                response.title = detail.querySelector(".item").rawText;
                response.arrival_date = detail.querySelector(".date").rawText;
                response.branch_name = detail
                    .querySelector(".name")
                    .querySelector("a").rawText;
                return response;
            });
            const response = new SummaryResponse();
            response.tracking_id = Number(trackingId.replace(/[^0-9]/g, ""));
            response.product_name = productName;
            response.estimate_arrival_date = productDate;
            response.details = details;
            return response;
        });
        this.results = results;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => SummaryResponse),
    (0, swagger_1.ApiProperty)({ type: [SummaryResponse] }),
    __metadata("design:type", Array)
], TrackingResponse.prototype, "results", void 0);
exports.TrackingResponse = TrackingResponse;
//# sourceMappingURL=resposne.entity.js.map