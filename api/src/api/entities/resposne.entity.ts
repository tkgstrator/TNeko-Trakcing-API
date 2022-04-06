import { HttpException, HttpStatus } from '@nestjs/common';
import { Type } from 'class-transformer';
import { Length } from 'class-validator';
import { parse } from 'node-html-parser';

export class ResponseEntity {
  constructor(html: string) {
    const root = parse(html);
    const blocks = root.querySelectorAll('.parts-tracking-invoice-block');
    const results = blocks.map((block) => {
      let trackingId = block.querySelector(
        '.tracking-invoice-block-title',
      ).rawText;
      const re = new RegExp('(\\d{4}-\\d{4}-\\d{4})');
      if (!re.test(trackingId)) {
        throw new HttpException(
          'Tracking Id must be provided 12 digets.',
          HttpStatus.BAD_REQUEST,
        );
      }
      // TrackingId
      trackingId = trackingId.match(re)[0];
      const stateTitle = block.querySelector(
        '.tracking-invoice-block-state-title',
      ).rawText;
      const stateSummary = block.querySelector(
        '.tracking-invoice-block-state-summary',
      ).rawText;
      const stateNote = block.querySelector(
        '.tracking-invoice-block-state-note',
      ).rawText;
      const blockSummary = block.querySelector(
        '.tracking-invoice-block-summary',
      );
      const productSummaries = blockSummary.querySelectorAll('.data');
      const productName = productSummaries[0].rawText;
      const productDate = productSummaries[1].rawText;
      const blockDetails = block.querySelector(
        '.tracking-invoice-block-detail',
      );
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

  @Type(() => SummaryEntity)
  results: SummaryEntity[];
}

export class SummaryEntity {
  tracking_id: number;
  product_name: string;
  estimate_arrival_date: string;
  @Type(() => DetailEntity)
  details: DetailEntity[];
}

export class DetailEntity {
  title: string;
  branch_name: string;
  arrival_date: string;
}
