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

  const seedDatabase = async () => {
    aeropuertoRepository.clear();
    aerolineaRepository.clear();
    aerolinea = await aerolineaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
    });
    aeropuerto = await aeropuertoRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      aerolinea: aerolinea,
    });
  };
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('associateAeropuertoToAerolinea should add an Aeropuerto into aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity =
      await aeropuertoRepository.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
      });
    const newAerolinea: AerolineaEntity = 
    await aerolineaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
    });
    const result: AerolineaEntity = 
    await service.associateAeropuertoToAerolinea(
      newAerolinea.id,
      newAeropuerto.id,
    );
    expect(result).not.toBeNull();
    expect(result.aeropuertos).not.toBeNull();
  });

  xit('associateAeropuertoToAerolinea should thrown exception for an invalid Aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity =
      await aeropuertoRepository.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
      });
    await expect(() =>
      service.associateAeropuertoToAerolinea(
        '0', 
        newAeropuerto.id),
    ).rejects.toHaveProperty(
      'message',
      'The aerolinea with the given id was not found',
    );
  });

  xit('associateAeropuertoToAerolinea should throw an exception for an invalid Aeropuerto', async () => {
    const newAerolinea: AerolineaEntity =
    await aerolineaRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
    });
  await expect(() =>
    service.associateAeropuertoToAerolinea(
      newAerolinea.id , 
      '0'),
  ).rejects.toHaveProperty(
    'message',
    'The Aeropuerto with the given id was not found',
  );
  });

  xit('findAeropuertoFromAerolinea should return Aeropuertos by Aerolinea', async () => {
    const storedAeropuerto: AeropuertoEntity[] = 
    await service.findAeropuertosFromAerolinea(
      aerolinea.id,
    );
    expect(storedAeropuerto).not.toBeNull();
  });

  xit('findAeropuertoFromAerolinea should return Aeropuerto by Aerolinea', async () => {
    const storedAeropuerto: AeropuertoEntity = 
    await service.findAeropuertoFromAerolinea(
      aerolinea.id,
      aeropuerto.id,
    );
    expect(storedAeropuerto).not.toBeNull();
  });

  xit('findAeropuertoFromAerolinea should throw an exception for an invalid Aeropuerto', async () => {
    await expect(() =>
      service.findAeropuertoFromAerolinea(
        aerolinea.id,
        '0'),
    ).rejects.toHaveProperty(
      'message',
      'The Aeropuerto with the given id was not found',
    );
  });

  xit('findAeropuertoFromAerolinea should throw an exception for an invalid Aerolinea', async () => {
    await expect(() =>
      service.findAeropuertoFromAerolinea(
        '0',
        aeropuerto.id),
    ).rejects.toHaveProperty(
      'message',
      'The Aerolinea with the given id was not found',
    );
  });

  xit('updateAeropuertosFromAerolinea should update Aeropuertos from Aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.company.name(),
      pais: faker.address.country(),
    });
    const updateAeropuertos: AeropuertoEntity[] =
      await service.updateAeropuertosFromAerolinea(
        aerolinea.id, 
        newAeropuerto.pais);
    expect(updateAeropuertos).not.toBeNull();
    expect(updateAeropuertos[0].pais).toBe(newAeropuerto.nombre);
  });

  xit('deleteAeropuertosFromAerolinea should remove an Aeropuertos from a Aerolinea', async () => {
    const deletedaerolinea: AeropuertoEntity[] = await service.deleteAeropuertosFromAerolinea(
      aerolinea.id);
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
