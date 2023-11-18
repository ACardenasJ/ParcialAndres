import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaController } from './aerolinea.controller';
import { AerolineaEntity } from './aerolinea.entity';
import { Aerolineaervice } from './aerolinea.service';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
  providers: [Aerolineaervice],
  controllers: [AerolineaController],
})
export class AerolineaModule {}
