import { Tracking } from '../interfaces/tracking.interface';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RequestEntity implements Tracking {
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @IsArray()
  @IsNumber({}, { each: true })
  readonly tracking_id: number[];
}
