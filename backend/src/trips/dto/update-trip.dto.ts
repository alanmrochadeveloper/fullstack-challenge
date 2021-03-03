import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  goal: string;
  @IsOptional()
  updateDate: string;
}
