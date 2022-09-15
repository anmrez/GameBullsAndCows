import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),

    RoomsModule,

  ],

})
export class AppModule {}
