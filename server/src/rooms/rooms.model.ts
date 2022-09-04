import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  code: string;

  @Column()
  host: string;

  @Column()
  guest: string;

}
