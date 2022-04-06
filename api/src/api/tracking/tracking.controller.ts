import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { RequestEntity } from '../entities/request.entity';
import { ResponseEntity } from '../entities/resposne.entity';
import { TrackingService } from './tracking.service';

@Controller('api/tracking')
export class TrackingController {
  constructor(private readonly service: TrackingService) {}

  @Post('/')
  @HttpCode(200)
  create(@Body() request: RequestEntity): Promise<ResponseEntity> {
    return this.service.create(request);
  }

  @Get('/')
  methodNotAllowed() {
    return this.service.methodNotAllowed();
  }
}
