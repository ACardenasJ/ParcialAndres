import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { AerolineaAeropuertoService } from './aerolinea_aeropuerto.service';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity'

describe('AerolineaAeropuerto', () => {
  let service: AerolineaAeropuertoService;
  let aeropuertoRepository: Repository<AeropuertoEntity>;
  let aerolineaRepository: Repository<AerolineaEntity>;
  let aerolinea: AerolineaEntity;
  let aeropuerto: AeropuertoEntity;
  let aerolineaList: AerolineaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaAeropuertoService],
    }).compile();
    service = module.get<AerolineaAeropuertoService>(AerolineaAeropuertoService);
    
    aerolineaRepository = module.get<Repository<AerolineaEntity>>(
      getRepositoryToken(AerolineaEntity),
    );
    aeropuertoRepository = module.get<Repository<AeropuertoEntity>>(
      getRepositoryToken(AeropuertoEntity),
    );
    await seedDatabase();
  });
  const seedDatabase = async () => {
    aerolineaList = [];
    aeropuertoRepository.clear();
    aerolineaRepository.clear();
    aeropuerto = await aeropuertoRepository.save({
      nombre: faker.company.name(),
      codigo: faker.company.companySuffix(),
      pais: faker.address.country(),
      ciudad: faker.address.city(),
      aerolineas: [],
    });
    
    for (let i = 0; i < 5; i++) {
      const aerolineaEntity: AerolineaEntity = await aerolineaRepository.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: new Date(faker.date.past()),
        fechaCreacion: new Date(faker.date.future()),
        urlPaginaWeb: faker.address.country(),
      });
      aerolineaList.push(aerolineaEntity);
    }
  
  };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('associateAeropuertoToAerolinea should add an Aeropuerto into aerolinea', async () => {
    const result: AerolineaEntity = 
    await service.associateAeropuertoToAerolinea(
     aerolineaList[2].id,
      aeropuerto.id,
    );
    expect(result).not.toBeNull();
    expect(result.aeropuertos).not.toBeNull();
  });

  it('associateAeropuertoToAerolinea should thrown exception for an invalid Aerolinea', async () => {
    await expect(() =>
      service.associateAeropuertoToAerolinea(
        '0', 
        aeropuerto.id),
    ).rejects.toHaveProperty(
      'message',
      'The aerolinea with the given id was not found',
    );
  });

  it('associateAeropuertoToAerolinea should throw an exception for an invalid Aeropuerto', async () => {
  await expect(() =>
    service.associateAeropuertoToAerolinea(
      aerolineaList[0].id , 
      '0'),
  ).rejects.toHaveProperty(
    'message',
    'The Aeropuerto with the given id was not found',
  );
  });

  it('findAeropuertoFromAerolinea should return Aeropuertos by Aerolinea', async () => {
    const storedAeropuerto: AeropuertoEntity[] = 
    await service.findAeropuertosFromAerolinea(
      aerolineaList[1].id,
    );
    expect(storedAeropuerto).not.toBeNull();
  });

  it('findAeropuertoFromAerolinea should return Aeropuerto by Aerolinea', async () => {
    const storedAeropuerto: AeropuertoEntity = 
    await service.findAeropuertoFromAerolinea(
      aerolineaList[3].id,
      aeropuerto.id,
    );
    expect(storedAeropuerto).not.toBeNull();
  });

  it('findAeropuertoFromAerolinea should throw an exception for an invalid Aeropuerto', async () => {
    await expect(() =>
      service.findAeropuertoFromAerolinea(
        aerolineaList[4].id,
        '0'),
    ).rejects.toHaveProperty(
      'message',
      'The Aeropuerto with the given id was not found',
    );
  });

  it('findAeropuertoFromAerolinea should throw an exception for an invalid Aerolinea', async () => {
    await expect(() =>
      service.findAeropuertoFromAerolinea(
        '0',
        aeropuerto.id),
    ).rejects.toHaveProperty(
      'message',
      'The Aerolinea with the given id was not found',
    );
  });

  it('updateAeropuertosFromAerolinea should update Aeropuertos from Aerolinea', async () => {
    aeropuertoRepository.save(aeropuerto);
    const updateAeropuertos: AeropuertoEntity[] =
      await service.updateAeropuertosFromAerolinea(
        aerolineaList[0].id, 
        aeropuerto.id);
    expect(updateAeropuertos).not.toBeNull();
    expect(updateAeropuertos[0].pais).toBe(aeropuerto.pais);
  });

  xit('deleteAeropuertosFromAerolinea should remove an Aeropuertos from a Aerolinea', async () => {
    aeropuertoRepository.save(aeropuerto);
    const deletedaerolinea: AeropuertoEntity[] = 
      await service.deleteAeropuertosFromAerolinea(
        aerolineaList[0].id);
    expect(deletedaerolinea).toBeNull();
  });

  xit('deleteAeropuertosFromAerolinea should thrown an exception for an invalid Aerolinea', async () => {
    await expect(() =>
      service.deleteAeropuertosFromAerolinea(
        '0'),
    ).rejects.toHaveProperty(
      'message',
      'The Aerolinea with the given id was not found',
    );
  });

});
