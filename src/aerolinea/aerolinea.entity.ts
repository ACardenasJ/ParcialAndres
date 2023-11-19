import { Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class  AerolineaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fechaFundacion: Date;

  @Column()
  fechaCreacion: Date;

  @Column()
  urlPaginaWeb: string;

  @JoinTable()
  @ManyToOne(() => AeropuertoEntity, (aeropuerto) => aeropuerto.aerolineas)
  aeropuertos: AeropuertoEntity[];
}
