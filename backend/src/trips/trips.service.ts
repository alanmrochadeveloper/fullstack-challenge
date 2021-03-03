import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { TripRepository } from './repositories/trip.repository';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(TripRepository)
    private tripRepository: TripRepository,
  ) {}
  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return await this.tripRepository.createTrip(createTripDto);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.getTrips();
  }

  async findOne(id: number): Promise<Trip> {
    const found = await this.tripRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Trip with id = ${id} not found!`);
    }
    return found;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const { location, goal } = updateTripDto;
    const tripToUpdate = await this.findOne(id);
    tripToUpdate.location = location;
    tripToUpdate.goal = goal;
    tripToUpdate.updateDate = new Date().toLocaleString();
    await tripToUpdate.save();
    return tripToUpdate;
  }

  async remove(id: number): Promise<Trip> {
    const trip = await this.findOne(id);
    return this.tripRepository.remove(trip);
  }
}
