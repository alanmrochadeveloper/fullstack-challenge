import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // unique identifier

  @Column()
  country: string; // country name which one would travel to!

  @Column()
  location: string; // specific location in that country!

  @Column()
  goal: string; //date which one wish or deadline to travel

  @Column()
  countryUrl: string; //country flag url

  @Column()
  creationDate: string; // date which the record was created

  @Column()
  updateDate: string; //date which the record was updated
}
