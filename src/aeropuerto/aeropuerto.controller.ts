import {Body, Controller, Delete, Get, HttpCode, 
    Param, Post, Put, UseInterceptors, UseGuards, Logger
  } from '@nestjs/common';

import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { AeropuertoService } from './aeropuerto.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AeropuertoaDTO } from './aeropuerto.dto';
import { plainToInstance } from 'class-transformer';

@Controller('aeropuerto')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoController {
    private readonly logger = new Logger(AeropuertoController.name);
    constructor(private readonly aeropuertoService: AeropuertoService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
      this.logger.debug('findAll');
      return await this.aeropuertoService.findAll();
    }
  
    @Get(':aeropuertoId')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('aeropuertoId') aeropuertoId: string) {
      this.logger.debug('findOne');
      return await this.aeropuertoService.findOne(aeropuertoId);
    }
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() aeropuertoDto: AeropuertoaDTO) {
      this.logger.debug('create');
      const aeropuerto: AeropuertoEntity = plainToInstance(
        AeropuertoEntity,
        aeropuertoDto,
      );
      return await this.aeropuertoService.create(aeropuerto);
    }
  
    @Put(':aeropuertoId')
    @UseGuards(JwtAuthGuard)
    async update(@Param('aeropuertoId') aeropuertoId: string, @Body() aeropuertoDto: aeropuertoDTO,
    ) {
      this.logger.debug('update');
      const aeropuerto: AeropuertoEntity = plainToInstance(
        AeropuertoEntity,
        aeropuertoDto,
      );
      return await this.aeropuertoService.update(aeropuertoId, aeropuerto);
    }
  
    @HttpCode(204)
    @Delete(':aeropuertoId')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('aeropuertoId') aeropuertoId: string) {
      this.logger.debug('update');
      return await this.aeropuertoService.delete(aeropuertoId);
    }
}
