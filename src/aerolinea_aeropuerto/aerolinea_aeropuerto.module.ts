import { Module } from '@nestjs/common';
import { AerolineaAeropuertoService } from './aerolinea_aeropuerto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { AerolineaAeropuertoController } from './aerolinea_aeropuerto.controller';

@Module({
  providers: [AerolineaAeropuertoService],
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  controllers: [AerolineaAeropuertoController],
})
export class AerolineaAeropuertoModule {}
