import { TrackingRequest } from "../entities/request.entity";
import { TrackingResponse } from "../entities/resposne.entity";
export declare class TrackingService {
    create(request: TrackingRequest): Promise<TrackingResponse>;
    methodNotAllowed(): void;
}
