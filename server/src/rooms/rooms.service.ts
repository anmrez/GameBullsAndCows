import { Injectable } from '@nestjs/common';


@Injectable()
export class RoomsService {

  rooms: {
    codeRoom: string | undefined,
    difficulty: number,
    player1: {
      username: string | undefined,
      id: string | undefined,
      number: undefined,
    },
    player2: {
      username: string | undefined,
      id: string | undefined,
      number: undefined,
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


  definitionPerson( clientID: string, codeRoom: string ){

    console.log( `=== definitionPerson ===` )
    console.log( clientID, codeRoom )

    let roomIndex = this.findRoom( codeRoom )
    if ( roomIndex === null ) return null
    let room = this.rooms[ roomIndex ]
    // console.log( room )
    if ( room.player1.id === clientID ) return 'host'
    if ( room.player2.id === clientID ) return 'guest'

  }


  private addRooms( room: any ){

    this.rooms.push({ 
      codeRoom: room.code, 
      difficulty: 3,
      player1: { 
        username: room.username, 
        id: room.id,
        number: undefined,
      }, 
      player2: {
        username: undefined, 
        id: undefined,
        number: undefined,
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

    let roomIndex = this.findRoom( codeRoom )
    let room = this.rooms[ roomIndex ]

    if ( roomIndex === null ) return 'room not found'
    if ( room.player2.id !== undefined ) return 'The lobby is full'

    room.player2 = {
      username: username,
      id: clientID,
      number: undefined,
    }

    return room

  }

  deleteRoom( codeRoom: string ){

    // let codeRoom = data.codeRoom
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

  guestDisconnect( codeRoom: string ){

    // let codeRoom = data.codeRoom
    let indexRoom = this.findRoom( codeRoom )
    this.rooms[ indexRoom ].player2 = {
      username: undefined,
      id: undefined,
      number: undefined,
    }
    console.log( `update player2:` )
    console.log( this.rooms[ indexRoom ] )

  }


  generateNumber( difficulty: number ){

    let random = Math.random() * 1_000_000
    random = Math.floor( random )

    let randomStr = String( random )
    randomStr = randomStr.substring( 0, difficulty )

    for ( let i = 0; i < randomStr.length; i++ ) {

      let digit = randomStr[i]
      let reg = '/' + digit + '/g' 
      console.log( reg )
      let digitLength = randomStr.match( reg ).length
      console.log( `${ i }: ${ digit }` )
      
    }


    console.log( randomStr )
    return randomStr

  }


  checkPlayer2( codeRoom: string ){

    let roomIndex = this.findRoom( codeRoom )
    let room = this.rooms[ roomIndex ]
    console.log( room )

    let player2ID = room.player2.id
    let player2Name = room.player2.id
    if ( player2ID !== undefined && player2Name !== undefined ) return 'success'
    return 'fail'

  }


  private findRoom( codeRoom: string ){

    let indexRoom = null
    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) return indexRoom = i 

    });

    return indexRoom

  }

}
