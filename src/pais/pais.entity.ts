import {Column, Entity, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { CulturagastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RegionEntity } from '../region/region.entity';

@Entity()
export class PaisEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(
    () => CulturagastronomicaEntity,
    (culturagastronomica) => culturagastronomica.restaurante,
  )
  culturasgastronomicas: CulturagastronomicaEntity[];

  @OneToMany(() => RegionEntity, (region) => region.pais)
  regiones: RegionEntity[];
}
