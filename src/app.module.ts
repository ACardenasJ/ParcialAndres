import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturagastronomicaModule } from './culturagastronomica/culturagastronomica.module';
import { CulturagastronomicaEntity } from './culturagastronomica/culturagastronomica.entity';
import { PaisModule } from './pais/pais.module';
import { PaisEntity } from './pais/pais.entity';
import { GastroculturePaisModule } from './gastroculture_pais/gastroculture_pais.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gastroapidb',
      entities: [
        CulturagastronomicaEntity,
        PaisEntity,
      ],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    CulturagastronomicaModule,
    PaisModule,
    GastroculturePaisModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
