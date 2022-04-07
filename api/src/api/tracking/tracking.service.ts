import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { TrackingRequest } from "../entities/request.entity";
import { TrackingResponse } from "../entities/resposne.entity";

@Injectable()
export class TrackingService {
  async create(request: TrackingRequest): Promise<TrackingResponse> {
    const url = "https://toi.kuronekoyamato.co.jp/cgi-bin/tneko";
    const parameters = new URLSearchParams();

    request.tracking_id.forEach((tracking_id, index) => {
      parameters.append(
        `number${String(index + 1).padStart(2, "0")}`,
        request.tracking_id[index].toString()
      );
    });
    const response = await axios.post(url, parameters);
    return new TrackingResponse(response.data);
  }

  methodNotAllowed() {
    throw new HttpException(
      "Method Not Allowed",
      HttpStatus.METHOD_NOT_ALLOWED
    );
  }
}
