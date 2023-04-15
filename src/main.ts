import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env['PORT'] || 3000, () =>
    console.log(`app is listening on port ${process.env['PORT'] || 3000}`),
  );
}
config();
bootstrap();
