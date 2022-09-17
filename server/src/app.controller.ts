import { Controller, Get, Param, StreamableFile, UploadedFile, UseInterceptors, Res, Header, Post, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import * as path from 'path'
const fs = require('fs');

@Controller( )
export class AppController {
  constructor( private readonly appService: AppService ) {}


  @Get( 'getMobileApp' )
  getMobileApp(
  ) {

    return this.appService.getAll()

  }

  @Post( 'deleteMobileApp' )
  deleteMobileApp(
    @Body() file,
  ){

    console.log( `=== deleteMobileApp ===` )
    let nameFile = file.nameFile
    let pathFile = path.join( __dirname, '..', 'mobileApp', nameFile )
    this.appService.removeFile( pathFile )

  }

  @Header('Content-Type', 'text/html')
  @Get( '1029384756' )
  getUploadHTML(
  ) {

    const html = path.join( __dirname, '..', 'client', 'index.html');
    const htmlStream = fs.createReadStream( html, 'utf8' );
    return new StreamableFile( htmlStream );

  }

  @UseInterceptors( FileInterceptor( 'file' ) )
  @Post( '1029384756' )
  async upload(
    @UploadedFile() file,
    @Res() res
  ){

    
    console.log( file )
    
    let ext = path.extname( file.originalname )
    console.log( `ext: ${ ext }` )
    if ( ext !== '.apk' ) return

    let pathFile = path.join( __dirname, '..', 'mobileApp', file.originalname )

    await fs.writeFile( pathFile, file.buffer, function( err ) {

      if ( err ) return console.log( err )

    });

    return res.redirect('1029384756');

  }

  @Get( '/download/:file' )
  download( 
    @Param('file') file,
  ){

    let href = path.join( __dirname, '..', 'mobileApp', file)
    console.log( href )
    let responseFile = fs.createReadStream( href )
    return new StreamableFile( responseFile )

  }

}
