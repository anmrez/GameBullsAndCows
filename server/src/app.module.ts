import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModel } from './rooms/rooms.model';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';
import { RoomGateway } from './rooms/rooms.gateway';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [

    // ServeStaticModule.forRoot({
    //   rootPath: join( __dirname, '..', 'client/dist' ),
    // }),


    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),


  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number( process.env.POSTGRES_PORT ),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    entities: [
      RoomModel
    ],
    retryAttempts: 2,
    synchronize: true,
  }),


    RoomsModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
