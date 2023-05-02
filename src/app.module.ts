import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { DataSource } from 'typeorm';
import { AuthMiddleware } from './middlewares/auth-middleware';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DB_HOST'] || 'localhost',
      port: Number.parseInt(process.env['DB_PORT']) || 3306,
      username: process.env['DB_USERNAME'] || 'root',
      password: process.env['DB_PASSWORD'] || '',
      database: process.env['DB_NAME'] || 'todo',
      entities: [],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'mySecretKey',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'v1/todo',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/todo/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'v1/todo/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'v2/todo',
        method: RequestMethod.POST,
      },
      {
        path: 'v2/todo/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'v2/todo/:id',
        method: RequestMethod.DELETE,
      },
    );
    // .forRoutes({ path: 'todo', method: RequestMethod.POST });
  }
}
