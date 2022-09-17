import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }

})
export class AppGateway {
  @WebSocketServer()
  server: Server


  constructor (
    private appService: AppService
  ) {}

  @SubscribeMessage( 'getAppMobileList' )
  getAppMobileList(
    @ConnectedSocket() client: Socket,
  ){

    console.log( `=== getAppMobileList ===` )

    let apps = this.appService.getAll()
    console.log( apps )
    if ( apps === undefined ) return undefined
    return apps

  }


}