import { TrackingRequest } from "../entities/request.entity";
import { TrackingResponse } from "../entities/resposne.entity";
import { TrackingService } from "./tracking.service";
export declare class TrackingController {
    private readonly service;
    constructor(service: TrackingService);
    post(request: TrackingRequest): Promise<TrackingResponse>;
}
