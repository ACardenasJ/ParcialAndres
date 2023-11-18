import {Body, Controller, Delete, Get, HttpCode, 
  Param, Post, Put, UseInterceptors, UseGuards, Logger
} from '@nestjs/common';

import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AerolineaService } from './aerolinea.service';
import { AerolineaDTO } from './aerolinea.dto';
import { AerolineaEntity } from './aerolinea.entity';

@Controller('aerolinea')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaController {
  private readonly logger = new Logger(AerolineaController.name);
    constructor(private readonly aerolineaService: AerolineaService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
      this.logger.debug('findAll');
      return await this.aerolineaService.findAll();
    }
  
    @Get(':aerolineaId')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('aerolineaId') aerolineaId: string) {
      this.logger.debug('findOne');
      return await this.aerolineaService.findOne(aerolineaId);
    }
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() aerolineaDto: AerolineaDTO) {
      this.logger.debug('create');
      const aerolinea: AerolineaEntity = plainToInstance(
        AerolineaEntity,
        aerolineaDto,
      );
      return await this.aerolineaService.create(aerolinea);
    }
  
    @Put(':aerolineaId')
    @UseGuards(JwtAuthGuard)
    async update(@Param('aerolineaId') aerolineaId: string, @Body() aerolineaDto: AerolineaDTO,
    ) {
      this.logger.debug('update');
      const aerolinea: AerolineaEntity = plainToInstance(
        AerolineaEntity,
        aerolineaDto,
      );
      return await this.aerolineaService.update(aerolineaId, aerolinea);
    }
  
    @HttpCode(204)
    @Delete(':aerolineaId')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('aerolineaId') aerolineaId: string) {
      this.logger.debug('update');
      return await this.aerolineaService.delete(aerolineaId);
    }
}

