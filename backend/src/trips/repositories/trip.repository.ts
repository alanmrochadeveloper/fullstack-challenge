import { EntityRepository, Repository } from 'typeorm';
import { CreateTripDto } from '../dto/create-trip.dto';
import { Trip } from '../entities/trip.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip> {
  async getTrips(): Promise<Trip[]> {
    const query = this.createQueryBuilder('trip');
    const trips = await query.orderBy('trip.goal').getMany();
    return trips;
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const { country, location, goal, countryUrl } = createTripDto;
    const trip = new Trip();
    trip.country = country;
    trip.location = location;
    trip.goal = goal;
    trip.countryUrl = countryUrl;
    trip.creationDate = new Date().toLocaleString();
    trip.updateDate = new Date().toLocaleString();
    await trip.save();

    return trip;
  }
}
