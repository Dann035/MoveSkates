import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  // web (Next) usa el 3000; la API escucha en 3001 para no chocar.
  await app.listen(process.env.PORT ?? 4001);
}
await bootstrap();
