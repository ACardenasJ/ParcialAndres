import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaEntity } from '../../culturagastronomica/culturagastronomica.entity';
import { PaisEntity } from '../../pais/pais.entity';


export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      CulturagastronomicaEntity,
      PaisEntity,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    CulturagastronomicaEntity,
  ]),
];
