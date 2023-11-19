import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards, Logger } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { AerolineaAeropuertoService } from './aerolinea_aeropuerto.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@Controller('aerolinea_aeropuerto')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaAeropuertoController {
    private readonly logger = new Logger(AerolineaAeropuertoController.name);
    constructor(private readonly aeropuertoAerolineaService: AerolineaAeropuertoService) { }

    @UseGuards(JwtAuthGuard)
    @Post('associate/aerolinea/:aerolineaId/aeropuerto/:aeropuertoAssociateId')
    async associateAeropuertoToAerolinea(
        @Param('aerolineaId') aerolineaId: string, 
        @Param('aeropuertoAssociateId') aeropuertoAssociateId: string) {
        this.logger.debug('associateAeropuertoToAerolinea');
        return await this.aeropuertoAerolineaService.associateAeropuertoToAerolinea(
            aerolineaId, 
            aeropuertoAssociateId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':aerolineaId')
    async findAeropuertosFromAerolinea(
        @Param('aerolineaId') aerolineaId: string) {
        this.logger.debug('findAeropuertosFromAerolinea');
        return await this.aeropuertoAerolineaService.findAeropuertosFromAerolinea(
            aerolineaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('find/aerolinea/:aerolineaId/aeropuerto/:aeropuertoId')
    async findAeropuertoFromAerolinea(
        @Param('aerolineaId') aerolineaId: string,
        @Param('aeropuertoId') aeropuertoId: string) {
        this.logger.debug('findAeropuertoFromAerolinea');
        return await this.aeropuertoAerolineaService.findAeropuertoFromAerolinea(
            aerolineaId,
            aeropuertoId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/aerolinea/:aerolineaId/aeropuertos/:aeropuertoId')
    async updateAeropuertosFromAerolinea( 
        @Param('aerolineaId') aerolineaId: string,
        @Param('aeropuertoId') aeropuertoId: string) {
        this.logger.debug('updateAeropuertosFromAerolinea');
        return await this.aeropuertoAerolineaService.updateAeropuertosFromAerolinea(
            aerolineaId, 
            aeropuertoId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/aerolinea/:aerolineaId/aeropuerto')
    @HttpCode(204)
    async deleteAeropuertosFromAerolinea(@Param('aerolineaId') aerolineaId: string) {
        this.logger.debug('deleteAeropuertosFromAerolinea');
        return await this.aeropuertoAerolineaService.deleteAeropuertosFromAerolinea(
            aerolineaId);
    }
}
