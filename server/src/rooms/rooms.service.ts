import { Injectable } from '@nestjs/common';


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

  getRooms(){

    return this.rooms

  }

  create( data: any, clientID: string ){

    let username = this.getUsername( data )
    let codeRoom = this.generateCodeRoom()

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

    let room = this.findRoom( String( random ) )
    if ( room !== null ) {
      console.log( `Комната ${ random } уже существует. Генерация нового номера` )
      return this.generateCodeRoom()
    } 

    if ( String( random ).length !== length ) return this.generateCodeRoom()
    return String( random )

  }




  private addRooms( room: any ){

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

  connectInRooms( data: { codeRoom:string, cookie: string }, clientID: any ){

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

  deleteRoom( data ){

    let codeRoom = data.codeRoom
    console.log( codeRoom )

    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) {
        console.log( `room delete. code:` + item.codeRoom )
        this.rooms.splice( i, 1 )

      } 

    });

  }

  roomEditDifficulty( data: { codeRoom: string, difficulty: number } ){

    let difficulty = data.difficulty
    let codeRoom = data.codeRoom
    let indexRoom = this.findRoom( codeRoom )
    this.rooms[ indexRoom ].difficulty = difficulty
    console.log( `update difficulty:` )
    console.log( this.rooms[ indexRoom ] )

  }

  guestDisconnect( data: { codeRoom: string } ){

    let codeRoom = data.codeRoom
    let indexRoom = this.findRoom( codeRoom )
    this.rooms[ indexRoom ].player2 = {
      username: undefined,
      id: undefined
    }
    console.log( `update player2:` )
    console.log( this.rooms[ indexRoom ] )

  }

  private findRoom( codeRoom: string ){

    let indexRoom = null
    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) return indexRoom = i 

    });

    return indexRoom

  }

}
