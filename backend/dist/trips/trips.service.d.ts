import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { TripRepository } from './repositories/trip.repository';
export declare class TripsService {
    private tripRepository;
    constructor(tripRepository: TripRepository);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(): Promise<Trip[]>;
    findOne(id: number): Promise<Trip>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<Trip>;
    remove(id: number): Promise<Trip>;
}
