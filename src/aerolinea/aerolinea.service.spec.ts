import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';

describe('Aerolinearvice', () => {
  let service: AerolineaService;
  let repository: Repository<AerolineaEntity>;
  let aerolineaList: AerolineaEntity[];

  const seedDatabase = async () => {
    repository.clear();
    aerolineaList = [];
    for (let i = 0; i < 5; i++) {
      const aerolineaEntity: AerolineaEntity = await repository.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: new Date(faker.date.past()),
        fechaCreacion: new Date(faker.date.future()),
        urlPaginaWeb: faker.address.country(),
      });
      aerolineaList.push(aerolineaEntity);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<AerolineaEntity>>(
      getRepositoryToken(AerolineaEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all Aerolineas', async () => {
    const aerolineas: AerolineaEntity[] = await service.findAll();
    expect(aerolineas).not.toBeNull();
    expect(aerolineas).toHaveLength(aerolineaList.length);
  });

  it('findOne should return a Aerolinea by id', async () => {
    const storedAerolinea: AerolineaEntity = aerolineaList[1];
    const aerolinea: AerolineaEntity = await service.findOne(storedAerolinea.id);
    expect(aerolinea).not.toBeNull();
    expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
    expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
  });

  it('findOne should throw an exception for an invalid Aerolineas', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The aerolinea with the given id was not found',
    );
  });

  it('create should return a new Aerolineas', async () => {
    const aerolinea: AerolineaEntity = {
      id: '48a9ab90-1276-11ed-861d-0242ac120003',
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      fechaFundacion: new Date(faker.date.past()),
      fechaCreacion: new Date(faker.date.future()),
      urlPaginaWeb: faker.address.cardinalDirection(),
      aeropuertos: [],
    };
    const newaerolinea: AerolineaEntity = await service.create(aerolinea);
    expect(newaerolinea).not.toBeNull();
    const storedaerolinea: AerolineaEntity = await repository.findOne({
      where: { id: newaerolinea.id },
    });
    expect(storedaerolinea).not.toBeNull();
    expect(storedaerolinea.nombre).toEqual(newaerolinea.nombre);
    expect(storedaerolinea.descripcion).toEqual(newaerolinea.descripcion);
  });

  it('create should failed condition problem', async () => {
    const aerolinea: AerolineaEntity = {
      id: '48a9ab90-1276-11ed-861d-0242ac120003',
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      fechaFundacion: new Date(faker.date.future()),
      fechaCreacion: new Date(faker.date.past()),
      urlPaginaWeb: faker.address.cardinalDirection(),
      aeropuertos: [],
    };
    await expect(() => service.create(aerolinea)).rejects.toHaveProperty(
      'message',
      'The aerolinea can not be created. the fechafundacion must be older',
    );
 
  });

  it('update should modify a Aerolineas', async () => {
    const aerolinea: AerolineaEntity = aerolineaList[0];
    aerolinea.nombre = 'Colombia';
    aerolinea.descripcion = 'tercer mas hermosos del mundo';
    aerolinea.fechaFundacion = new Date(faker.date.past());
    aerolinea.fechaCreacion = new Date(faker.date.future());
    const updateaerolinea: AerolineaEntity = await service.update(aerolinea.id, aerolinea);
    expect(updateaerolinea).not.toBeNull();
    const storedaerolinea: AerolineaEntity = await repository.findOne({
      where: { id: aerolinea.id },
    });
    expect(storedaerolinea).not.toBeNull();
    expect(storedaerolinea.nombre).toEqual(aerolinea.nombre);
    expect(storedaerolinea.descripcion).toEqual(aerolinea.descripcion);
  });

  it('update should failed condition problem', async () => {
    const aerolinea: AerolineaEntity = aerolineaList[0];
    aerolinea.nombre = 'Colombia';
    aerolinea.descripcion = 'tercer mas hermosos del mundo';
    aerolinea.fechaFundacion = new Date(faker.date.future());
    aerolinea.fechaCreacion = new Date(faker.date.past());
    await expect(() => service.update(aerolinea.id, aerolinea)).rejects.toHaveProperty(
      'message',
      'The aerolinea can not be Updated. the fechafundacion must be older',
    );
  });

  it('update should throw an exception for an invalid Aerolineas', async () => {
    let aerolinea: AerolineaEntity = aerolineaList[0];
    aerolinea = {
      ...aerolinea,
      nombre: 'New name',
      descripcion: 'New desc',
    };
    await expect(() => service.update('0', aerolinea)).rejects.toHaveProperty(
      'message',
      'The aerolinea with the given id was not found',
    );
  });

  it('delete should remove a Aerolineas', async () => {
    const aerolinea: AerolineaEntity = aerolineaList[0];
    await service.delete(aerolinea.id);
    const deleteaerolinea: AerolineaEntity = await repository.findOne({
      where: { id: aerolinea.id },
    });
    expect(deleteaerolinea).toBeNull();
  });

  it('delete should throw an exception for an invalid Aerolineas', async () => {
    const aerolinea: AerolineaEntity = aerolineaList[0];
    await service.delete(aerolinea.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The aerolinea with the given id was not found',
    );
  });
});
