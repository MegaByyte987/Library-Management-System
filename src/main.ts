import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //instance is created

  app.enableCors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // if using cookies/sessions
  });

  app.useGlobalPipes(new ValidationPipe()); //middleware
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  await app.listen(process.env.PORT ?? 3000); //application starts
}
bootstrap();
