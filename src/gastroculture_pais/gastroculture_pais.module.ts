import { Module } from '@nestjs/common';
import { GastroculturePaisService } from './gastroculture_pais.service';
import { GastroculturePaisController } from './gastroculture_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';

@Module({
  providers: [GastroculturePaisService],
  imports: [TypeOrmModule.forFeature([CulturagastronomicaEntity, PaisEntity])],
  controllers: [GastroculturePaisController],
})
export class GastroculturePaisModule {}
