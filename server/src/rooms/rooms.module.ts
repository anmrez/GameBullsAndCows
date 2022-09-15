import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';


@Module({
  controllers: [
    RoomsController
  ],
  providers: [
    RoomsService,
    RoomGateway,
  ],

  exports:[

    RoomsService

  ]
})
export class RoomsModule {}
