import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DB_HOST'],
      port: Number.parseInt(process.env['DB_PORT']),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_NAME'],
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
