import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

@WebSocketGateway({
  // cors: true
  cors: {
    origin: '*'
  }

})
export class RoomGateway {
  @WebSocketServer()
  server: Server


  constructor (
    private roomsService: RoomsService
  ) {}


  @SubscribeMessage( 'createLobbi' )
  createLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){

    console.log( `=== create Lobbi ===` )
    let room = this.roomsService.create( data, client.id )

    let codeRoom = room.codeRoom
    client.join( codeRoom )
    client.in( codeRoom ).emit( 'room', "You are in room no. " + codeRoom );
    console.log( client.rooms );
    console.log( this.server.adapter )
    return room

  }


  @SubscribeMessage( 'connectLobbi' )
  connectLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){
    console.log( `=== connectLobbi ===` )
    let response = this.roomsService.connectInRooms( data, client.id )
    if ( response === undefined ) {
      console.log( `'room not found'` )
      return 'room not found'
    } 
    
    this.server.emit( 'userConnected', response )
    let codeRoom = response.codeRoom
    client.join( codeRoom )
    console.log( client.rooms );
    // this.server.to( codeRoom ).emit( 'room', { room: 'aRoom' } );
    client.in( codeRoom ).emit( 'room', "You are in room no. " + codeRoom );

    return response
  }
  

  @SubscribeMessage( 'changeDifficulty' )
  changeDifficulty(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){

    console.log( `=== changeDifficulty ===` )
    console.log( data )
    
    this.roomsService.roomEditDifficulty( data )
    
    let response = {
      difficulty: data.difficulty
    }
    console.log( `response:` )
    console.log( response )

    client.broadcast.emit( 'listenerDifficulty', response )

  }


  @SubscribeMessage( 'disconnectHost' )
  disconnectHost(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){
    console.log( `=== disconnectHost ===` )
    console.log( data )
    
    let response = {
      disconnect: 'host'
    }
    this.roomsService.deleteRoom( data )
    client.broadcast.emit( 'listenerDisconnect', response )

  }


  @SubscribeMessage( 'disconnectGuest' )
  disconnectGuest(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ){
    console.log( `=== disconnectGuest ===` )
    console.log( data )

    this.roomsService.guestDisconnect( data )

    let response = {
      disconnect: 'guest'
    }
    client.broadcast.emit( 'listenerDisconnect', response )

  }


}
