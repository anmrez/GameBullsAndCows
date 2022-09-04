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

  // @SubscribeMessage( 'connectInLobbi' )
  // connectRoom(  ) {

  //   console.log( `user connect` )
  //   return 'Подключение успешно';

  // }


  @SubscribeMessage( 'createLobbi' )
  async createLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){

    console.log( `=== create Lobbi ===` )
    // client.emit( 'roomCreated', 'success' )
    let room = await this.roomsService.create( data )
    return {
      host: room.host,
      code: room.code
    }

  }


  @SubscribeMessage( 'connectLobbi' )
  async connectLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){

    console.log( `=== find lobbi ===` )
    let response
    let room = await this.roomsService.connect( data )
    if ( room === null ) return { status: 'not found' }
    
    response = {
      status: 'success',
      guest: room.guest,
      host: room.host,
      code: room.code,
    }
    this.server.emit( 'userConnected', response )
    return response
    
  }
  
  @SubscribeMessage( 'changeDifficulty' )
  changeDifficulty(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){
    
    console.log( `=== changeDifficulty ===` )
    console.log( data )
    let response = {
      difficulty: data.number
    }
    client.broadcast.emit( 'clickDif', response )

  }


}
