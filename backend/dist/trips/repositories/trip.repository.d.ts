import { Repository } from 'typeorm';
import { CreateTripDto } from '../dto/create-trip.dto';
import { Trip } from '../entities/trip.entity';
export declare class TripRepository extends Repository<Trip> {
    getTrips(): Promise<Trip[]>;
    createTrip(createTripDto: CreateTripDto): Promise<Trip>;
}
