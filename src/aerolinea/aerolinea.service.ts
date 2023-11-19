import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {BusinessError, BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async findAll(): Promise<AerolineaEntity[]> {
    return await this.aerolineaRepository.find({
      relations: ['aeropuertos'],
    });
  }

  async findOne(id: string): Promise<AerolineaEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return aerolinea;
  }

  async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    if (new Date(aerolinea.fechaCreacion) > new Date(aerolinea.fechaFundacion)){
      return await this.aerolineaRepository.save(aerolinea)
    }
    else
      throw new BusinessLogicException(
        'The aerolinea can not be created. the fechafundacion must be older',
        BusinessError.PRECONDITION_FAILED,
      );
  }

  async update(id: string, aerolineaToUpdate: AerolineaEntity): Promise<AerolineaEntity> {
    const persistedAerolinea: AerolineaEntity =
      await this.aerolineaRepository.findOne({ where: { id } });
    if (!persistedAerolinea){
      throw new BusinessLogicException(
        'The aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
   if (!aerolineaToUpdate.fechaCreacion || ! aerolineaToUpdate.fechaCreacion || new Date(aerolineaToUpdate.fechaCreacion) > new Date(aerolineaToUpdate.fechaFundacion)){
      return await this.aerolineaRepository.save({
        ...persistedAerolinea,
        ...aerolineaToUpdate,
      });
    } 
   else
    throw new BusinessLogicException(
      'The aerolinea can not be Updated. the fechafundacion must be older',
      BusinessError.PRECONDITION_FAILED,
    ); 
  }

  async delete(id: string) {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id },
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.aerolineaRepository.remove(aerolinea);
  }
  
}
