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
  rooms: {
    codeRoom: string | undefined
    player1: {
      username: string | undefined,
      id: string | undefined,
    },
    player2: {
      username: string | undefined,
      id: string | undefined,
    },
  }[] = []

  constructor (
    private roomsService: RoomsService
  ) {}

  @SubscribeMessage( 'createLobbi' )
  async createLobbi(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ){

    console.log( `=== create Lobbi ===` )

    let room = await this.roomsService.create( data, client.id )
    this.addRooms( room )
    console.log( typeof this.rooms, this.rooms )
    
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

    console.log( `=== connectLobbi ===` )
    
    let guestUsername = this.roomsService.getUsername( data )
    let codeRoom = data.codeRoom
    let dataConnect = {
      id: client.id,
      guest: guestUsername
    }
    this.connectInRooms( codeRoom, dataConnect )
    this.server.emit( 'userConnected', this.findRoom( codeRoom ) )
    
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


  private addRooms( room ){

    this.rooms.push({ 
      codeRoom: room.code, 
      player1: { 
        username: room.host, 
        id: room.id
      }, 
      player2: {
        username: undefined, 
        id: undefined
      } 
    })

    console.log( `Room added:` )
    console.log( this.rooms[ this.rooms.length - 1 ] )
    console.log( `  ` )

  }

  private connectInRooms( codeRoom: any, data: any ){

    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) {

        item.player2 = {
          username: data.guest,
          id: data.id
        }
        console.log( `rooms updated` )
        console.log( item )
        console.log( `  ` )

      }

    });


  }

  private findRoom( codeRoom ){

    let response 
    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) response = item

    });

    return response

  }


}
