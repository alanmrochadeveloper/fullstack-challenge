import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  goal: string;

  @IsNotEmpty()
  countryUrl: string;

  //creationDate: string;

  //updateDate: string;
}
