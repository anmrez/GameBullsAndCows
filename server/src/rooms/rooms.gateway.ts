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


  @SubscribeMessage( 'createLobby' )
  createLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cookie: string }
  ){

    console.log( `=== create Lobby ===` )
    console.log( data )

    let response = this.roomsService.create( data, client.id )
    let codeRoom = response.codeRoom
    client.join( codeRoom )
    this.listenerDisconnect( codeRoom, client )


    return response

  }


  @SubscribeMessage( 'connectLobby' )
  connectLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string, cookie: string }
  ){

    console.log( `=== connectLobby ===` )
    console.log( data )

    let response = this.roomsService.connectInRooms( data, client.id )
    if ( response === 'room not found'  ) return 'room not found' 
    if ( response === 'The lobby is full' ) return 'The lobby is full'
    // console.log( response )
    
    let codeRoom = data.codeRoom
    client.join( codeRoom )
    this.listenerDisconnect( codeRoom, client )

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
  disconnectHostSocket(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string }
  ){

    console.log( `=== disconnectHost ===` )
    console.log( data )

    let codeRoom = data.codeRoom
    this.disconnectHost( codeRoom, client )

  }


  @SubscribeMessage( 'disconnectGuest' )
  disconnectGuestSocket(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string },
  ){
    console.log( `=== disconnectGuest ===` )
    console.log( data )

    
    let codeRoom = data.codeRoom
    this.roomsService.guestDisconnect( codeRoom )
    
    this.disconnectGuest( codeRoom, client )

  }


  @SubscribeMessage( 'checkPlayer2' )
  checkPlayers(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string },
  ){

    console.log( `=== checkPlayer2 ===` )
    console.log( data )

    let codeRoom = data.codeRoom
    let response = this.roomsService.checkPlayer2( codeRoom )

    return response

  }


  @SubscribeMessage( 'startGame' )
  startGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string },
  ){

    console.log( `=== startGame ===` )
    console.log( data )

    let codeRoom = data.codeRoom
    this.roomsService.startGame( codeRoom )

    let dataResponse = {
      event: 'startGame',
    }

    this.server.to( codeRoom ).emit( 'room', dataResponse );

  }


  @SubscribeMessage( 'setNumber' )
  setNumber(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string, number: string } 
  ){

    console.log( `=== setNumber ===` )
    console.log( data )

    let codeRoom = data.codeRoom
    let response = this.roomsService.setNumber( data, client.id )

    this.sendResponseAllInRoom( codeRoom, 'ready', response )

  }


  @SubscribeMessage( 'getBullsAndCows' )
  getBullsAndCows(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { codeRoom: string, number: string } 
  ){

    console.log( `=== getBullsAndCows ===` )
    console.log( data )

    let response: any = this.roomsService.getBullsAndCows( data, client.id )

    if ( response.complited ) {

      let codeRoom = data.codeRoom
      let dataResponse = this.roomsService.getUsernameAndTurnsFromRoom( codeRoom, client.id )
      response.turns = dataResponse.turns

      this.sendResponseInRoom( codeRoom, client, 'listenerComplited', dataResponse )

    }

    console.log( `response:` )
    console.log( response )
    return response

  }

  @SubscribeMessage( 'updateStatistics' )
  updateStatistics(
    // @ConnectedSocket() client: Socket,
    @MessageBody() codeRoom: string 
  ){

    console.log( `=== updateStatistics ===` )
    console.log( codeRoom )

    let response = this.roomsService.getStatistics( codeRoom )

    this.sendResponseAllInRoom( codeRoom, 'statistics', response )

  }
  

  // =======
  // private
  // =======

  private sendResponseAllInRoom( codeRoom: string, event: string, response: any ){

    let data = {
      event: event,
      param: response
    }

    this.server.to( codeRoom ).emit( 'room', data );

  }

  private sendResponseInRoom( codeRoom: string, client: Socket, event: string, response: any ){

    let data = {
      event: event,
      param: response
    }

    client.broadcast.to( codeRoom ).emit( 'room', data );

  }

  private listenerDisconnect( codeRoom: string, client: Socket ){
    
    console.log( `client ${ client.id } add listener 'disconnect'` )
    client.on( "disconnecting", (  ) => {

      console.log( `=== disconnecting ===` )

      type personT = 'host' | 'guest' | null
      let person: personT = this.roomsService.definitionPerson( client.id, codeRoom )
      
      if ( person === null ) return
      if ( person === 'host' ) this.disconnectHost( codeRoom, client )
      if ( person === 'guest' ) this.disconnectGuest( codeRoom, client )

    });

  }


  private disconnectHost( codeRoom: string, client: Socket ){

    this.roomsService.deleteRoom( codeRoom )
    let response = { disconnect: 'host' }
    this.sendResponseInRoom( codeRoom, client, 'listenerDisconnect', response )

    client.leave( codeRoom )
    this.server.in( codeRoom ).disconnectSockets( true );

  }


  private disconnectGuest( codeRoom: string, client: Socket ){

    let response = { disconnect: 'guest' }
    this.sendResponseInRoom( codeRoom, client, 'listenerDisconnect', response )
    client.leave( codeRoom )
    this.roomsService.guestDisconnect( codeRoom )

  }


}
