/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CulturagastronomicaEntity } from './culturagastronomica.entity';

@Injectable()
export class CulturagastronomicaService {
    constructor(
        @InjectRepository(CulturagastronomicaEntity)
        private readonly culturagastronomicaRepository: Repository<CulturagastronomicaEntity>
    ) { }

    async findAll(): Promise<CulturagastronomicaEntity[]> {
        return await this.culturagastronomicaRepository.find({
            relations: ["restaurante", "pais", "producto", "recetas"]
        });
    }

    async findOne(id: string): Promise<CulturagastronomicaEntity> {
        const culturagastronomica: CulturagastronomicaEntity = await this.culturagastronomicaRepository.findOne({
            where: { id }, relations: ["restaurante", "pais", "producto", "recetas"]
        });
        if (!culturagastronomica) {
            throw new BusinessLogicException("The gastronomic culture with the given id was not found", BusinessError.NOT_FOUND);
        }
        return culturagastronomica;
    }
    async create(culturagastronomica: CulturagastronomicaEntity): Promise<CulturagastronomicaEntity> {
        return await this.culturagastronomicaRepository.save(culturagastronomica);
    }

    async update(id: string, culturagastronomicaRepository: CulturagastronomicaEntity): Promise<CulturagastronomicaEntity> {
        const persistedCulturagastronomica: CulturagastronomicaEntity = await this.culturagastronomicaRepository.findOne({ where: { id } });
        if (!persistedCulturagastronomica) {
            throw new BusinessLogicException("The gastronomic culture with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.culturagastronomicaRepository.save({ ...persistedCulturagastronomica, ...culturagastronomicaRepository });
    }

    async delete(id: string) {
        const culturagastronomica: CulturagastronomicaEntity = await this.culturagastronomicaRepository.findOne({ where: { id } });
        if (!culturagastronomica) {
            throw new BusinessLogicException("The gastronomic culture with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.culturagastronomicaRepository.remove(culturagastronomica);
    }
}
