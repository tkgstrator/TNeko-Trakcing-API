import { RequestEntity } from '../entities/request.entity';
import { ResponseEntity } from '../entities/resposne.entity';
import { TrackingService } from './tracking.service';
export declare class TrackingController {
    private readonly service;
    constructor(service: TrackingService);
    create(request: RequestEntity): Promise<ResponseEntity>;
    methodNotAllowed(): void;
}
