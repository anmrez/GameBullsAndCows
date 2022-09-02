import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  // cors: true
  cors: {
    origin: '*'
  }

})
export class RoomGateway {



  @SubscribeMessage( 'connectInRoom' )
  connectRoom(  ) {

    return 'Подключение успешно';

  }

  @SubscribeMessage( 'disconnectFromRoom' )
  disconnectRoom(){


  }


  @SubscribeMessage( 'makeMove' )
  makeMove(){


  }


}
