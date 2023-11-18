import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaEntity } from './culturagastronomica.entity';
import { CulturagastronomicaService } from './culturagastronomica.service';
import { CulturagastronomicaController } from './culturagastronomica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CulturagastronomicaEntity])],
  providers: [CulturagastronomicaService],
  controllers: [CulturagastronomicaController],
})
export class CulturagastronomicaModule {}
