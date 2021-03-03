import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TripsModule],
})
export class AppModule {}
