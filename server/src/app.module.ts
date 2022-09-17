import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';


@Module({
  imports: [
    RoomsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AppGateway,
  ],

})
export class AppModule {}
