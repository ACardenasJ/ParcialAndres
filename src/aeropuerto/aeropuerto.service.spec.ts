import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';

describe('aeropuertorvice', () => {
  let service: AeropuertoService;
  let repository: Repository<AeropuertoEntity>;
  let aeropuertoList: AeropuertoEntity[];

  const seedDatabase = async () => {
    repository.clear();
    aeropuertoList = [];
    for (let i = 0; i < 5; i++) {
      const aeropuertoEntity: AeropuertoEntity = await repository.save({
        nombre: faker.company.name(),
        codigo: "abc",
        pais: faker.address.country(),
        ciudad: faker.address.city(),
      });
      aeropuertoList.push(aeropuertoEntity);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<AeropuertoEntity>>(
      getRepositoryToken(AeropuertoEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all aeropuertos', async () => {
    const aeropuerto: AeropuertoEntity[] = await service.findAll();
    expect(aeropuerto).not.toBeNull();
    expect(aeropuerto).toHaveLength(aeropuertoList.length);
  });

  it('findOne should return a aeropuerto by id', async () => {
    const storedAeropuerto: AeropuertoEntity = aeropuertoList[1];
    const aeropuerto: AeropuertoEntity = await service.findOne(storedAeropuerto.id);
    expect(aeropuerto).not.toBeNull();
    expect(aeropuerto.nombre).toEqual(storedAeropuerto.nombre);
    expect(aeropuerto.codigo).toEqual(storedAeropuerto.codigo);
  });

  it('findOne should throw an exception for an invalid aeropuertos', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The aeropuerto with the given id was not found',
    );
  });

  it('create should return a new aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = {
      id: '48a9ab90-1276-11ed-861d-0242ac120003',
      nombre: faker.company.name(),
      codigo: "acj",
      pais: faker.address.country(),
      ciudad: faker.address.city(),
      aerolineas: [],
    };
    const newAeropuerto: AeropuertoEntity = await service.create(aeropuerto);
    expect(newAeropuerto).not.toBeNull();
    const storedAeropuerto: AeropuertoEntity = await repository.findOne({
      where: { id: newAeropuerto.id },
    });
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(newAeropuerto.nombre);
    expect(storedAeropuerto.ciudad).toEqual(newAeropuerto.ciudad);
  });

  it('create should failed condition problem', async () => {
    const aeropuerto: AeropuertoEntity = {
      id: '48a9ab90-1276-11ed-861d-0242ac120003',
      nombre: faker.company.name(),
      codigo: faker.animal.bear(),
      pais: faker.address.country(),
      ciudad: faker.address.city(),
      aerolineas: [],
    };
    await expect(() => service.create(aeropuerto)).rejects.toHaveProperty(
      'message',
      'The aeropuerto can not be created. the Codigo is too long',
    );
  });

  it('update should modify a aeropuertos', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    aeropuerto.nombre = 'El dorado';
    aeropuerto.pais = 'Colombia';
    const updateaeropuerto: AeropuertoEntity = await service.update(aeropuerto.id, aeropuerto);
    expect(updateaeropuerto).not.toBeNull();
    const storedAeropuerto: AeropuertoEntity = await repository.findOne({
      where: { id: aeropuerto.id },
    });
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(aeropuerto.nombre);
    expect(storedAeropuerto.pais).toEqual(aeropuerto.pais);
  });

  it('update should faild condition in aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    aeropuerto.nombre = 'El dorado';
    aeropuerto.pais = 'Colombia';
    aeropuerto.codigo = "LLCA";
    await expect(() => service.update(aeropuerto.id, aeropuerto)).rejects.toHaveProperty(
      'message',
      'The aeropuerto can not be Updated. the Codigo is too long',
    );
   
  });

  it('update should throw an exception for an invalid aeropuertos', async () => {
    let aeropuerto: AeropuertoEntity = aeropuertoList[0];
    aeropuerto = {
      ...aeropuerto,
      nombre: 'New name',
      pais: 'New pais',
    };
    await expect(() => service.update('0', aeropuerto)).rejects.toHaveProperty(
      'message',
      'The aeropuerto with the given id was not found',
    );
  });

  it('delete should remove a aeropuertos', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    await service.delete(aeropuerto.id);
    const deleteaeropuerto: AeropuertoEntity = await repository.findOne({
      where: { id: aeropuerto.id },
    });
    expect(deleteaeropuerto).toBeNull();
  });

  it('delete should throw an exception for an invalid aeropuertos', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    await service.delete(aeropuerto.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The aeropuerto with the given id was not found',
    );
  });
});
