import { Tracking } from "../interfaces/tracking.interface";
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class TrackingRequest implements Tracking {
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  readonly tracking_id: number[];
}
