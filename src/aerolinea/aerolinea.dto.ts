
import { IsNotEmpty, IsString } from 'class-validator';

export class AerolineaDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsString()
  @IsNotEmpty()
  readonly fechaFundacion: Date;

  @IsString()
  @IsNotEmpty()
  readonly fechaCreacion: Date;

  @IsString()
  @IsNotEmpty()
  readonly urlPaginaWeb: string;
}
