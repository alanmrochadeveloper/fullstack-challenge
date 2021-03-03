import { BaseEntity } from 'typeorm';
export declare class Trip extends BaseEntity {
    id: number;
    country: string;
    location: string;
    goal: string;
    countryUrl: string;
    creationDate: string;
    updateDate: string;
}
