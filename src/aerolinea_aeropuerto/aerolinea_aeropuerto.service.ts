import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';

@Injectable()
export class AerolineaAeropuertoService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async associateAeropuertoToAerolinea(
    aerolineaId: string, 
    aeropuertoAssociateId: string
    ): Promise<AerolineaEntity> {
    const aerolineaToAssociate: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id: aerolineaId },
        //relations: ['aeropuertos'],
      });

    if (!aerolineaToAssociate) {
      throw new BusinessLogicException(
        'The aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    const aeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
      where: { id: aeropuertoAssociateId },
    });
    if (!aeropuerto) {
      throw new BusinessLogicException(
        'The Aeropuerto with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    aerolineaToAssociate.aeropuertos.push(aeropuerto);
    return await this.aerolineaRepository.save(aerolineaToAssociate);
  }

  async findAeropuertosFromAerolinea(
    aerolineaId: string
    ): Promise<AeropuertoEntity[]> {
    const aerolineaToAnalize: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id: aerolineaId },
        //relations: ['aeropuertos'],
      });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return aerolineaToAnalize.aeropuertos;
  }

  async findAeropuertoFromAerolinea(
    aerolineaId: string, 
    aeropuertoId: string
    ): Promise<AeropuertoEntity> {
    const aerolineaToAnalize: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id: aerolineaId },
        //relations: ['aeropuertos'],
      });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      ); 
    }
    const aeropuerto: AeropuertoEntity = await this.aeropuertoRepository.findOne({
      where: { id: aeropuertoId },
    });
    if (!aeropuerto) {
      throw new BusinessLogicException(
        'The Aeropuerto with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return aeropuerto;
  }

  async updateAeropuertosFromAerolinea(
    aerolineaId: string, 
    pais: string
    ): Promise<AeropuertoEntity[]> {
    const aerolineaToAnalize: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id: aerolineaId },
       // relations: ['aeropuertos'],
      });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    aerolineaToAnalize.aeropuertos.forEach((aeropuerto)=> {
      aeropuerto.pais = pais;
      this.aeropuertoRepository.save(aeropuerto);
    });
    return aerolineaToAnalize.aeropuertos;
  }

  async deleteAeropuertosFromAerolinea(
    aerolineaId: string
    ): Promise<AeropuertoEntity[]> {
    const aerolineaToAnalize: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id: aerolineaId },
       // relations: ['aeropuertos'],
      });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    aerolineaToAnalize.aeropuertos.forEach((aeropuerto)=> {
      this.aeropuertoRepository.remove(aeropuerto);
    });
    return aerolineaToAnalize.aeropuertos;
  }


}
