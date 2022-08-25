import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  code: number;

  @Column()
  players: number;

  @Column()
  maxPlayers: number;

  @Column()
  password: string;

}
