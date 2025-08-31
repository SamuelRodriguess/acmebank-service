import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; // Import necessário
import { UserModule } from './modules/user/user.module';
import { AppController } from './modules/app.controller';
import { DB_SQLITE } from './config/const';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: DB_SQLITE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'html'),
    }),
    AuthModule,
    UserModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
