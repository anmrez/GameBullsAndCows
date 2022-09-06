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

  // @Post( 'get' )
  // async getRooms(
  //   // @Headers( 'Access-Control-Allow-Origin' ) headers: string
  // ) {

  //   return 'room get'
  //   // return this.roomsService.generateCodeRoom()
  //   // let rooms = await this.roomsService.getAll()
  //   // console.log( rooms )
  //   // return rooms

  // }


  // @Post('create')
  // async createRoom(
  //   @Body() dto,
  // ) {

  //   // return this.roomsService.generateCodeRoom()
  //   // return this.roomsService.create( dto )

  // }


  // @Post('delete')
  // async deleteRoom(
  //   @Body() dto,
  // ) {

  //   // return this.roomsService.delete( dto )

  // }






}
