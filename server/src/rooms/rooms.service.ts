import { Injectable } from '@nestjs/common';


@Injectable()
export class RoomsService {

  rooms: {
    codeRoom: string | undefined,
    difficulty: number,
    game: string,
    beginningGame: number | undefined,
    player1: {
      username: string | undefined,
      id: string | undefined,
      number: string | undefined,
      turns: number | undefined,
      completed: boolean,
      endTime: number | undefined
    },
    player2: {
      username: string | undefined,
      id: string | undefined,
      number: string | undefined,
      turns: number | undefined,
      completed: boolean,
      endTime: number | undefined
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

  getUsername( data: any ) :string {


    let arrCookie = data.cookie.split( '; ' )

    let username :string = ''
    arrCookie.forEach( item => {
      
      let index = item.indexOf( 'username=' )
      if ( index >= 0 ) username = item.replace( 'username=', '' )
      
    })
    if ( username === '' ) return 'error'
    return username

  }

  getUsernameAndTurnsFromRoom( codeRoom: string, clientID: string ){

    let room = this.getRoom( codeRoom )
    if ( room === null ) return null
    
    if ( room.player1.id === clientID ) return {

      username: room.player1.username,
      turns: room.player1.turns,
    
    } 
      
    if ( room.player2.id === clientID ) return {

      username: room.player2.username,
      turns: room.player2.turns,
    
    } 

    return null

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

    let roomIndex = this.findRoom( codeRoom )
    if ( roomIndex === null ) return null
    let room = this.rooms[ roomIndex ]
    if ( room.player1.id === clientID ) return 'host'
    if ( room.player2.id === clientID ) return 'guest'

  }


  private addRooms( room: any ){

    this.rooms.push({ 
      codeRoom: room.code, 
      difficulty: 3,
      game: 'waiting',
      beginningGame: undefined,
      player1: { 
        username: room.username, 
        id: room.id,
        number: undefined,
        turns: 0,
        completed: false,
        endTime: undefined
      }, 
      player2: {
        username: undefined, 
        id: undefined,
        number: undefined,
        turns: 0,
        completed: false,
        endTime: undefined
      } 
    })

    let lastRoom = this.rooms[ this.rooms.length - 1 ]
    // console.log( `Room added:` )
    // console.log( lastRoom )
    // console.log( `  ` )
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
      turns: 0,
      completed: false,
      endTime: undefined
    }

    return room

  }

  deleteRoom( codeRoom: string ){

    // console.log( codeRoom )

    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) {
        // console.log( `room delete. code:` + item.codeRoom )
        this.rooms.splice( i, 1 )

      } 

    });

  }

  roomEditDifficulty( data: { codeRoom: string, difficulty: number } ){

    let difficulty = data.difficulty
    let codeRoom = data.codeRoom
    let indexRoom = this.findRoom( codeRoom )
    this.rooms[ indexRoom ].difficulty = difficulty
    // console.log( `update difficulty:` )
    // console.log( this.rooms[ indexRoom ] )

  }

  guestDisconnect( codeRoom: string ){

    // let codeRoom = data.codeRoom
    let indexRoom = this.findRoom( codeRoom )
    this.rooms[ indexRoom ].player2 = {
      username: undefined,
      id: undefined,
      number: undefined,
      turns: undefined,
      completed: false,
      endTime: undefined
    }
    // console.log( `update player2:` )
    // console.log( this.rooms[ indexRoom ] )

  }


  startGame( codeRoom: string ){

    let room = this.getRoom( codeRoom )
    room.game = 'started'
    room.beginningGame = new Date().getTime()

  }


  checkPlayer2( codeRoom: string ){

    let room = this.getRoom( codeRoom )
    // console.log( room )

    let player2ID = room.player2.id
    let player2Name = room.player2.id
    if ( player2ID !== undefined && player2Name !== undefined ) return 'success'
    return 'fail'

  }


  setNumber( data: { codeRoom: string, number: string }, clientID: string ){

    let room = this.getRoom( data.codeRoom )
    if ( room === null ) return null

    if ( room.player1.id === clientID ) {

      if ( room.player2.number === undefined ) {

        room.player2.number = data.number
        if ( room.player1.number !== undefined && room.player2.number !== undefined ) return 'all ready'
        return 'player1 ready'

      } else {

        // console.log( 'число уже ведено' ) 

      }

    } 

    if ( room.player2.id === clientID ) {

      if ( room.player1.number === undefined ) {
      
        room.player1.number = data.number
        if ( room.player1.number !== undefined && room.player2.number !== undefined ) return 'all ready'
        return 'player2 ready'
      
      } else {

        // console.log( 'число уже ведено' ) 

      }

    } 


  }


  getBullsAndCows( data: { codeRoom: string, number: string }, clientID: string ){

    let codeRoom = data.codeRoom
    let clientNumber = data.number

    let room = this.getRoom( codeRoom )
    if ( room === null ) return null
    // console.log( room )

    let roomNumber: string

    if ( room.player1.id === clientID ) {

      roomNumber = room.player1.number
      room.player1.turns++

    }

    if ( room.player2.id === clientID ) {

      roomNumber = room.player2.number
      room.player2.turns++

    }

    let countBulls: number = 0
    let countCows: number = 0


    for ( let i = 0; i < roomNumber.length; i++ ) {
            
      let roomDigit = roomNumber[i];

      for ( let k = 0; k < clientNumber.length; k++ ) {

        let clientDigit = clientNumber[k]

        if ( roomDigit === clientDigit && i === k ) countBulls++
        if ( roomDigit === clientDigit && i !== k ) countCows++
        
      }

    }

    let response = {
      bulls: countBulls,
      cows: countCows,
      complited: false
    }

    if ( roomNumber.length === countBulls ) {

      // console.log( `complited` )
      if ( room.player1.id === clientID ) {
        room.player1.completed = true
        room.player1.endTime = new Date().getTime()
      } 
      if ( room.player2.id === clientID ) {
        room.player2.completed = true
        room.player2.endTime = new Date().getTime()
      } 

      response.complited = true

    }

    // console.log( room )

    return response

  }


  getStatistics( codeRoom: string ){

    let room = this.getRoom( codeRoom )
    if ( room === null ) return null

    // console.log( room )

    let response = {
      player1: room.player1.username,
      player2: room.player2.username,
      turns1: room.player1.turns,
      turns2: room.player2.turns,
      beginningGame: room.beginningGame,
      endTime1: room.player1.endTime,
      endTime2: room.player2.endTime,
      winner: ''
    }

    if ( room.player1.completed && room.player2.completed ) {

      if ( response.turns1 < response.turns2 ) response.winner = 'player1'
      if ( response.turns1 > response.turns2 ) response.winner = 'player2'
      if ( response.turns1 === response.turns2 ) response.winner = 'draw'

    }

    return response

  }


  // PRIVATE


  private getRoom ( codeRoom: string ){

    let roomIndex = this.findRoom( codeRoom )
    if ( roomIndex === null ) return null

    let room = this.rooms[ roomIndex ]
    return room

  }


  private findRoom( codeRoom: string ){

    let indexRoom = null
    this.rooms.forEach( ( item, i ) => {
      
      if ( item.codeRoom === codeRoom ) return indexRoom = i 

    });

    return indexRoom

  }

}
