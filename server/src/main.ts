import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {

  const PORT = process.env.PORT || 3001

  const app = await NestFactory.create( AppModule, { cors: true } );
  app.setGlobalPrefix('api')
  // app.useStaticAssets( join( __dirname, '..', 'views' ) )

  await app.listen( PORT, () => console.log( `[App] - sercer started on ${ PORT } port` ) );

}
start();
