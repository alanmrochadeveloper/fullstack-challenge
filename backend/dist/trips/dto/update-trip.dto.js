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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTripDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const create_trip_dto_1 = require("./create-trip.dto");
class UpdateTripDto extends mapped_types_1.PartialType(create_trip_dto_1.CreateTripDto) {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "location", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "goal", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "updateDate", void 0);
exports.UpdateTripDto = UpdateTripDto;
//# sourceMappingURL=update-trip.dto.js.map