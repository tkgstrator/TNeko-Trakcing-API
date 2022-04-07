import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { TrackingRequest } from "../entities/request.entity";
import { TrackingResponse } from "../entities/resposne.entity";
import { TrackingService } from "./tracking.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("api/tracking")
export class TrackingController {
  constructor(private readonly service: TrackingService) {}

  @Post("/")
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, type: TrackingResponse })
  @ApiTags("Tracking Items")
  post(@Body() request: TrackingRequest): Promise<TrackingResponse> {
    return this.service.create(request);
  }
}
