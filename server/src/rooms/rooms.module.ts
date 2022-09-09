import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RoomModel } from './rooms.model';

@Module({
  controllers: [
    RoomsController
  ],
  providers: [
    RoomsService,
    RoomGateway,
  ],
  // imports:[

  //   TypeOrmModule.forFeature([
  //     RoomModel
  //   ])

  // ],
  exports:[

    RoomsService

  ]
})
export class RoomsModule {}
