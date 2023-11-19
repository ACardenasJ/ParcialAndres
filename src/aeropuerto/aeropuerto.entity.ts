import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import {  Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AeropuertoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nombre: string;
  
    @Column()
    codigo: string;
  
    @Column()
    pais: string;
  
    @Column()
    ciudad: string;
    
    @OneToMany(() => AerolineaEntity, (aerolinea) => aerolinea.aeropuertos, {
        cascade: true,
      })
    aerolineas: AerolineaEntity[];
  
}
