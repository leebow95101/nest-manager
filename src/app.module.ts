import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'gjjcsb521',
        database: 'nest_manager',
        entities: ['dist/**/*.entity{.ts,.js}'],
        retryDelay: 500,
        retryAttempts: 10,
        synchronize: true,
        autoLoadEntities: true,
      },
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
