import { Injectable } from '@nestjs/common';
import { RoomsDto } from './dto/rooms.dto';
import { SHA3 } from 'sha3';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomModel } from './rooms.model';
import { Repository } from 'typeorm';
import { RoomGateway } from './rooms.gateway';

@Injectable()
export class RoomsService {

  rooms: {
    codeRoom: string | undefined,
    difficulty: number,
    player1: {
      username: string | undefined,
      id: string | undefined,
    },
    player2: {
      username: string | undefined,
      id: string | undefined,
    },
  }[] = []

  constructor(

    @InjectRepository( RoomModel ) private roomRepository: Repository < RoomModel >,

  ){ }

  getRooms(){

    return this.rooms

  }

  create( data: any, clientID: string ){


    let username = this.getUsername( data )
    console.log( `username: ${ username }` )

    let codeRoom = this.generateCodeRoom()
    console.log( `codeRoom: ${ codeRoom }` )
    let room = {
      username: username,
      code: codeRoom,
      id: clientID
    }

    return this.addRooms( room )

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




  private addRooms( room ){

    this.rooms.push({ 
      codeRoom: room.code, 
      difficulty: 3,
      player1: { 
        username: room.username, 
        id: room.id
      }, 
      player2: {
        username: undefined, 
        id: undefined
      } 
    })

    let lastRoom = this.rooms[ this.rooms.length - 1 ]
    console.log( `Room added:` )
    console.log( lastRoom )
    console.log( `  ` )
    return lastRoom

  }

  connectInRooms( data: any, clientID: any ){

    let username = this.getUsername( data )
    let codeRoom = data.codeRoom
    let response: any

    this.rooms.forEach( item => {
      
      if ( item.codeRoom === codeRoom ) {

        item.player2 = {
          username: username,
          id: clientID
        }
        console.log( `rooms updated` )
        console.log( item )
        console.log( `  ` )
        response = item

      }

    });

    return response

  }

  private findRoom( codeRoom ){

    let response 
    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) response = item

    });

    return response

  }

}
