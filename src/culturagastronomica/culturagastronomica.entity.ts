import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { PaisEntity } from '../pais/pais.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { RecetaEntity } from '../receta/receta.entity';

@Entity()
export class CulturagastronomicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @ManyToOne(
    () => RestauranteEntity,
    (restaurante) => restaurante.culturasgastronomicas,
  )
  restaurante: RestauranteEntity;

  @ManyToOne(() => PaisEntity, (pais) => pais.culturasgastronomicas)
  pais: PaisEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.culturasgastronomicas)
  producto: ProductoEntity;

  @OneToMany(() => RecetaEntity, (receta) => receta.culturaGastronomica)
  recetas: RecetaEntity[];
}
