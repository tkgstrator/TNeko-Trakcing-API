import { RequestEntity } from '../entities/request.entity';
import { ResponseEntity } from '../entities/resposne.entity';
export declare class TrackingService {
    create(request: RequestEntity): Promise<ResponseEntity>;
    methodNotAllowed(): void;
}
