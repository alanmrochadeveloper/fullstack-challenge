import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRepository } from './repositories/trip.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TripRepository])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
