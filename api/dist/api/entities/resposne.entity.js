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
exports.DetailEntity = exports.SummaryEntity = exports.ResponseEntity = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const node_html_parser_1 = require("node-html-parser");
class ResponseEntity {
    constructor(html) {
        const root = (0, node_html_parser_1.parse)(html);
        const blocks = root.querySelectorAll('.parts-tracking-invoice-block');
        console.log(blocks.length);
        const results = blocks.map((block) => {
            let trackingId = block.querySelector('.tracking-invoice-block-title').rawText;
            const re = new RegExp('(\\d{4}-\\d{4}-\\d{4})');
            if (!re.test(trackingId)) {
                throw new common_1.HttpException('Tracking Id must be provided 12 digets.', common_1.HttpStatus.BAD_REQUEST);
            }
            trackingId = trackingId.match(re)[0];
            const stateTitle = block.querySelector('.tracking-invoice-block-state-title').rawText;
            const stateSummary = block.querySelector('.tracking-invoice-block-state-summary').rawText;
            const stateNote = block.querySelector('.tracking-invoice-block-state-note').rawText;
            const blockSummary = block.querySelector('.tracking-invoice-block-summary');
            const productSummaries = blockSummary.querySelectorAll('.data');
            const productName = productSummaries[0].rawText;
            const productDate = productSummaries[1].rawText;
            const blockDetails = block.querySelector('.tracking-invoice-block-detail');
            const details = blockDetails.querySelectorAll('li').map((detail) => {
                const response = new DetailEntity();
                response.title = detail.querySelector('.item').rawText;
                response.arrival_date = detail.querySelector('.date').rawText;
                response.branch_name = detail
                    .querySelector('.name')
                    .querySelector('a').rawText;
                return response;
            });
            const response = new SummaryEntity();
            response.tracking_id = Number(trackingId.replace(/[^0-9]/g, ''));
            response.product_name = productName;
            response.estimate_arrival_date = productDate;
            response.details = details;
            return response;
        });
        this.results = results;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => SummaryEntity),
    __metadata("design:type", Array)
], ResponseEntity.prototype, "results", void 0);
exports.ResponseEntity = ResponseEntity;
class SummaryEntity {
}
__decorate([
    (0, class_transformer_1.Type)(() => DetailEntity),
    __metadata("design:type", Array)
], SummaryEntity.prototype, "details", void 0);
exports.SummaryEntity = SummaryEntity;
class DetailEntity {
}
exports.DetailEntity = DetailEntity;
//# sourceMappingURL=resposne.entity.js.map