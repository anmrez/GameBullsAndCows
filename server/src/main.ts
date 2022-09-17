import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {

  const PORT = 5005
  const app = await NestFactory.create( AppModule );

  await app.listen( PORT, () => console.log( `[App] - server started on ${ PORT } port` ) );

}

start();
