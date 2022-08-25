import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors:{
    origin: '*'
  }
})
export class RoomGateway {



  @SubscribeMessage( 'connectInRoom' )
  connectRoom(  ) {

    return 'success2';

  }

  @SubscribeMessage( 'disconnectFromRoom' )
  disconnectRoom(){


  }


  @SubscribeMessage( 'makeMove' )
  makeMove(){


  }


}
