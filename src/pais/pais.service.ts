import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PaisEntity } from './pais.entity';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(PaisEntity)
    private readonly paisRepository: Repository<PaisEntity>,
  ) {}

  async findAll(): Promise<PaisEntity[]> {
    return await this.paisRepository.find({
      relations: ['culturasgastronomicas'],
    });
  }

  async findOne(id: string): Promise<PaisEntity> {
    const culturagastronomica: PaisEntity = await this.paisRepository.findOne({
      where: { id },
      relations: ['culturasgastronomicas'],
    });
    if (!culturagastronomica) {
      throw new BusinessLogicException(
        'The Pais with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return culturagastronomica;
  }
  async create(culturagastronomica: PaisEntity): Promise<PaisEntity> {
    return await this.paisRepository.save(culturagastronomica);
  }

  async update(id: string, paisRepository: PaisEntity): Promise<PaisEntity> {
    const persistedCulturagastronomica: PaisEntity =
      await this.paisRepository.findOne({ where: { id } });
    if (!persistedCulturagastronomica) {
      throw new BusinessLogicException(
        'The Pais with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.paisRepository.save({
      ...persistedCulturagastronomica,
      ...paisRepository,
    });
  }

  async delete(id: string) {
    const culturagastronomica: PaisEntity = await this.paisRepository.findOne({
      where: { id },
    });
    if (!culturagastronomica) {
      throw new BusinessLogicException(
        'The Pais with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    await this.paisRepository.remove(culturagastronomica);
  }
}
