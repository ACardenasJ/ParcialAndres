import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';

@Injectable()
export class AeropuertoService {
    constructor(
        @InjectRepository(AeropuertoEntity)
        private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
      ) {}
      
      async findAll(): Promise<AeropuertoEntity[]> {
        return await this.aeropuertoRepository.find({
          relations: ['aerolineas'],
        });
      }
    
      async findOne(id: string): Promise<AeropuertoEntity> {
        const aeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
          where: { id },
          relations: ['aerolineas'],
        });
        if (!aeropuerto) {
          throw new BusinessLogicException(
            'The aeropuerto with the given id was not found',
            BusinessError.NOT_FOUND,
          );
        }
        return aeropuerto;
      }
    
      async create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
        if (aeropuerto.codigo.length <= 3)
          return await this.aeropuertoRepository.save(aeropuerto);
        else
        throw new BusinessLogicException(
          'The aeropuerto can not be created. the Codigo is too long',
          BusinessError.PRECONDITION_FAILED,
        ); 
      }
    
      async update(id: string, aeropuertoUpdate: AeropuertoEntity): Promise<AeropuertoEntity> {
        const persistedAeropuerto: AeropuertoEntity =
          await this.aeropuertoRepository.findOne({ where: { id } });
        if (!persistedAeropuerto) {
          throw new BusinessLogicException(
            'The aeropuerto with the given id was not found',
            BusinessError.NOT_FOUND,
          );
        }
        if (aeropuertoUpdate.codigo.length <= 3 || !aeropuertoUpdate.codigo)
        return await this.aeropuertoRepository.save({
          ...persistedAeropuerto,
          ...aeropuertoUpdate,
        });
        else
        throw new BusinessLogicException(
          'The aeropuerto can not be Updated. the Codigo is too long',
          BusinessError.PRECONDITION_FAILED,
        ); 
      }
    
      async delete(id: string) {
        const aeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
          where: { id },
        });
        if (!aeropuerto) {
          throw new BusinessLogicException(
            'The aeropuerto with the given id was not found',
            BusinessError.NOT_FOUND,
          );
        }
        await this.aeropuertoRepository.remove(aeropuerto);
      } 
}
