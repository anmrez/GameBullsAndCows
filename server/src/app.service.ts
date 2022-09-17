import { Injectable } from '@nestjs/common';
const mobileAppFolder = './mobileApp'
const fs = require('fs');

@Injectable()
export class AppService {
  
  getAll()  {

    return fs.readdirSync( mobileAppFolder );

  }

  removeFile( pathFile ){

    fs.unlink( pathFile, function( err ) {

      if ( err ) return console.log( err )

    })

  }
 
}
