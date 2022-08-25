import { Injectable } from '@nestjs/common';
import { RoomsDto } from './dto/rooms.dto';
import { SHA3 } from 'sha3';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomModel } from './rooms.model';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {


  constructor(

    @InjectRepository( RoomModel ) private roomRepository: Repository < RoomModel >,

  ){ }


  async getAll (){

    return this.roomRepository.find()

  }

  async create( dto: RoomsDto ){

    dto.password = this.hashingPass( dto.password )
    dto.code = await this.generateCodeRoom()
    dto.maxPlayers = 2
    dto.players = 1

    await this.roomRepository.save( dto )
    return dto

  }

  async delete( dto ){

    await this.roomRepository.delete({
      code: dto.code
    });

  }


  async generateCodeRoom() :Promise< number > {

    let random = Math.random()
    random *= 10_000
    let ceil = Math.ceil( random )

    let length = ceil.toString().length
    if ( length > 4 || length < 4 ) return this.generateCodeRoom()

    let result = await this.checkUnique( ceil )
    if ( result === null ) return ceil
    if ( result !== null ) return this.generateCodeRoom()

  }

  async checkUnique( floor ){

    return this.roomRepository.findOne({
      where: {
        code: floor
      }
    })

  }

  // === Prtivate ===

  private hashingPass( password: string ){

    const hash = new SHA3(512);

    hash.update( password );
    return hash.digest('hex');

  }

}
