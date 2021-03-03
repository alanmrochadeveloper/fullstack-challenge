"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trip_repository_1 = require("./repositories/trip.repository");
let TripsService = class TripsService {
    constructor(tripRepository) {
        this.tripRepository = tripRepository;
    }
    async create(createTripDto) {
        return await this.tripRepository.createTrip(createTripDto);
    }
    async findAll() {
        return this.tripRepository.getTrips();
    }
    async findOne(id) {
        const found = await this.tripRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`Trip with id = ${id} not found!`);
        }
        return found;
    }
    async update(id, updateTripDto) {
        const { location, goal } = updateTripDto;
        const tripToUpdate = await this.findOne(id);
        tripToUpdate.location = location;
        tripToUpdate.goal = goal;
        tripToUpdate.updateDate = new Date().toLocaleString();
        await tripToUpdate.save();
        return tripToUpdate;
    }
    async remove(id) {
        const trip = await this.findOne(id);
        return this.tripRepository.remove(trip);
    }
};
TripsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(trip_repository_1.TripRepository)),
    __metadata("design:paramtypes", [trip_repository_1.TripRepository])
], TripsService);
exports.TripsService = TripsService;
//# sourceMappingURL=trips.service.js.map