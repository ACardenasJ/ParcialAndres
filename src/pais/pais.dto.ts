/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class PaisDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;
}
