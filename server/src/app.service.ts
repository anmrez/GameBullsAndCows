import { Injectable } from '@nestjs/common';
const mobileAppFolder = './mobileApp'
const fs = require('fs');

@Injectable()
export class AppService {
  code: string

  constructor(){

    let code: number = Math.random() * 10_000
    code = Math.floor( code )
    this.code = String( code )
    this.getCode()

  }

  getCode() {

    console.log( `[App] - code: ` + this.code ) 

  }

  checkCode( request: any ){

    let cookieCode: string = request.cookies.code
    let showErr: boolean

    if ( cookieCode !== this.code ) {
      showErr = true
      
    } else {
      
      showErr = false

    }

    return showErr

  }
  
  getAll()  {

    return fs.readdirSync( mobileAppFolder );

  }

  removeFile( pathFile ){

    fs.unlink( pathFile, function( err ) {

      if ( err ) return console.log( err )

    })

  }
 
}
