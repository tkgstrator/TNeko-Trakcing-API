import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { RequestEntity } from '../entities/request.entity';
import { ResponseEntity } from '../entities/resposne.entity';

@Injectable()
export class TrackingService {
  async create(request: RequestEntity): Promise<ResponseEntity> {
    const url = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';
    const parameters = new URLSearchParams();

    request.tracking_id.forEach((tracking_id, index) => {
      parameters.append(
        `number${String(index + 1).padStart(2, '0')}`,
        request.tracking_id[index].toString(),
      );
    });
    const response = await axios.post(url, parameters);
    return new ResponseEntity(response.data);
  }

  methodNotAllowed() {
    throw new HttpException(
      'Method Not Allowed',
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
