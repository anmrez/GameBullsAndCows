import { Controller, Get, Param, StreamableFile, UploadedFile, UseInterceptors, Req, Res, Post, Body, NotFoundException } from '@nestjs/common';
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

  @Get( '' )
  getUploadHTML(
    @Req() req,
    @Res() res
  ) {

    let showErr = this.appService.checkCode( req )

    if ( showErr ) {
      
      res.header( 'Content-Type', 'application/json' )
      throw new NotFoundException( 'Cannot GET /' );
      
    } 
    
    res.header( 'Content-Type', 'text/html' )
    const html = path.join( __dirname, '..', 'client', 'index.html');
    const htmlStream = fs.createReadStream( html, 'utf8' );
    htmlStream.pipe(res)

  }

  @UseInterceptors( FileInterceptor( 'file' ) )
  @Post( '' )
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

    return res.redirect( '/' );

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
