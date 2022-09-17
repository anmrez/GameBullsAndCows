import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('')
export class RoomsController {


  constructor (
    private roomsService: RoomsService
  ) {}


  @Get( 'rooms' )
  getRooms(){

    return this.roomsService.getRooms()

  }

}
