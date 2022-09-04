import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomGateway } from './rooms.gateway';
import { RoomModel } from './rooms.model';
import { RoomsService } from './rooms.service';

@Module({
  // controllers: [
  //   RoomsController
  // ],
  providers: [
    RoomsService,
    RoomGateway,
  ],
  imports:[

    TypeOrmModule.forFeature([
      RoomModel
    ])

  ],
  exports:[

    RoomsService

  ]
})
export class RoomsModule {}
