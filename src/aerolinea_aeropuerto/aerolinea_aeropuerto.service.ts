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
        relations: ['aeropuertos'],
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
    aerolineaToAssociate.aeropuertos = [aeropuerto];
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
    aeropuertoid: string
    ): Promise<AeropuertoEntity[]> {
      const aerolineaToAnalize: AerolineaEntity =
        await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    const aeropuertoToAnalize: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoid },
      });
    if (!aeropuertoToAnalize) {
      throw new BusinessLogicException(
        'The Aeropuerto with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    if(aerolineaToAnalize.aeropuertos)
      aerolineaToAnalize.aeropuertos.forEach((aeropuerto)=> {
        if(aeropuerto.id === aeropuertoToAnalize.id){
          aeropuerto.nombre = aeropuertoToAnalize.nombre;
          aeropuerto.codigo = aeropuertoToAnalize.codigo;
          aeropuerto.ciudad = aeropuertoToAnalize.ciudad;
          aeropuerto.pais = aeropuertoToAnalize.pais;
          this.aeropuertoRepository.save(aeropuerto);
        } 
      });
    else{
      aerolineaToAnalize.aeropuertos = []
      aerolineaToAnalize.aeropuertos.push(aeropuertoToAnalize)
      this.aerolineaRepository.save(aerolineaToAnalize);
    } 
    return aerolineaToAnalize.aeropuertos;
  }

  async deleteAeropuertosFromAerolinea(
    aerolineaId: string
    ): Promise<AeropuertoEntity[]> {
      const aerolineaToAnalize: AerolineaEntity =
        await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
    if (!aerolineaToAnalize) {
      throw new BusinessLogicException(
        'The Aerolinea with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    console.log(aerolineaToAnalize);
    if(aerolineaToAnalize.aeropuertos)
        aerolineaToAnalize.aeropuertos.forEach((aeropuerto)=> {
          this.aeropuertoRepository.remove(aeropuerto);
        });
    else
    throw new BusinessLogicException(
      'The Aerolinea with the given id does not get a Aeropuerto to delete',
      BusinessError.FAILED_DELETE,
    );
    return aerolineaToAnalize.aeropuertos;
  }


}
