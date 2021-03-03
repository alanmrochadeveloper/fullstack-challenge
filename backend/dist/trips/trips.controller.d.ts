import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(): Promise<Trip[]>;
    findOne(id: number): Promise<Trip>;
    update(id: number, updateTripDto: UpdateTripDto): Promise<Trip>;
    updatePatch(id: number, updateTripDto: UpdateTripDto): Promise<Trip>;
    remove(id: number): Promise<Trip>;
}
