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
    @MessageBody() data: { cookie: string }
  ){

    console.log( `=== create Lobbi ===` )
    console.log( data )

    let response = this.roomsService.create( data, client.id )
    let codeRoom = response.codeRoom
    client.join( codeRoom )

    return response

  }


  @SubscribeMessage( 'connectLobbi' )
  connectLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string, cookie: string }
  ){

    console.log( `=== connectLobbi ===` )
    console.log( data )

    let response = this.roomsService.connectInRooms( data, client.id )
    if ( response === undefined ) return 'room not found' 
    
    let codeRoom = response.codeRoom
    client.join( codeRoom )
    this.sendResponseInRoom( codeRoom, client, 'userConnected', response )
    return response

  }
  

  @SubscribeMessage( 'changeDifficulty' )
  changeDifficulty(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string, difficulty: number }
  ){

    console.log( `=== changeDifficulty ===` )
    console.log( data )
    
    this.roomsService.roomEditDifficulty( data )
    
    let codeRoom = data.codeRoom
    let response = {
      difficulty: data.difficulty
    }
    this.sendResponseInRoom( codeRoom, client, 'listenerDifficulty', response )

  }


  @SubscribeMessage( 'disconnectHost' )
  disconnectHost(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string }
  ){

    console.log( `=== disconnectHost ===` )
    console.log( data )

    this.roomsService.deleteRoom( data )
    
    let codeRoom = data.codeRoom
    let response = { disconnect: 'host' }
    this.sendResponseInRoom( codeRoom, client, 'listenerDisconnect', response )

    client.leave( codeRoom )
    this.server.in( codeRoom ).disconnectSockets( true );

  }


  @SubscribeMessage( 'disconnectGuest' )
  disconnectGuest(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string },
  ){
    console.log( `=== disconnectGuest ===` )
    console.log( data )

    this.roomsService.guestDisconnect( data )
    
    let codeRoom = data.codeRoom
    let response = { disconnect: 'guest' }
    this.sendResponseInRoom( codeRoom, client, 'listenerDisconnect', response )
    
    client.leave( codeRoom )

  }

  private sendResponseInRoom( codeRoom: string, client: Socket, event: string, response: any ){

    let data = {
      event: event,
      param: response
    }

    client.broadcast.to( codeRoom ).emit( 'room', data );

  }


}
