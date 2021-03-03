import { CreateTripDto } from './create-trip.dto';
declare const UpdateTripDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTripDto>>;
export declare class UpdateTripDto extends UpdateTripDto_base {
    location: string;
    goal: string;
    updateDate: string;
}
export {};
