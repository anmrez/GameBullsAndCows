import { Injectable } from '@nestjs/common';
import { RoomsDto } from './dto/rooms.dto';
import { SHA3 } from 'sha3';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomModel } from './rooms.model';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {


  constructor(

    @InjectRepository( RoomModel ) private roomRepository: Repository < RoomModel >,

  ){ }

    
  async createRoomInDB( username :string, codeRoom :string ){

    let dto: RoomsDto = {
      host: username,
      code: codeRoom,
      guest: ''
    }
    return await this.roomRepository.save( dto )

  }

  async create( data: any ){

    let username = this.getUsername( data )
    console.log( `username: ${ username }` )

    let codeRoom = this.generateCodeRoom()
    console.log( codeRoom )

    let room = await this.createRoomInDB( username, codeRoom )
    console.log( room )

    return room

  }

  getUsername( data ) :string {

    let arrCookie = data.cookie.split( '; ' )

    let username :string = ''
    arrCookie.forEach( item => {
      
      let index = item.indexOf( 'username=' )
      if ( index >= 0 ) username = item.replace( 'username=', '' )
      
    })
    if ( username === '' ) return 'error'
    return username

  }

  generateCodeRoom(){

    let length = 6
    let random = Math.random() * 1_000_000
    random = Math.floor( random )
    if ( String( random ).length !== length ) return this.generateCodeRoom()
    return String( random )

  }


  async connect( data ){

    let username = this.getUsername( data )
    let codeRoom = data.codeRoom

    let room = await this.roomRepository.findOne({
      where:{
        code: codeRoom
      }
    })
    console.log( room )
    if ( room === null ) return null
    room.guest = username
    await this.roomRepository.save( room )
    return room

  }

}
