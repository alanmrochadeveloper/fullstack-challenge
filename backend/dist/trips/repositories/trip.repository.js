"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRepository = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("../entities/trip.entity");
let TripRepository = class TripRepository extends typeorm_1.Repository {
    async getTrips() {
        const query = this.createQueryBuilder('trip');
        const trips = await query.orderBy('trip.goal').getMany();
        return trips;
    }
    async createTrip(createTripDto) {
        const { country, location, goal, countryUrl } = createTripDto;
        const trip = new trip_entity_1.Trip();
        trip.country = country;
        trip.location = location;
        trip.goal = goal;
        trip.countryUrl = countryUrl;
        trip.creationDate = new Date().toLocaleString();
        trip.updateDate = new Date().toLocaleString();
        await trip.save();
        return trip;
    }
};
TripRepository = __decorate([
    typeorm_1.EntityRepository(trip_entity_1.Trip)
], TripRepository);
exports.TripRepository = TripRepository;
//# sourceMappingURL=trip.repository.js.map