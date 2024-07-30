import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  app.useGlobalPipes(
    new ValidationPipe()
  )
  const config = new DocumentBuilder()
  .setTitle('Youtube example')
  .setDescription('The Youtube API description')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
app.useStaticAssets(join(__dirname, "..","upload"),{
  prefix:'/upload/'
})
  await app.listen(3000);
}
bootstrap();
