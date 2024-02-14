import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tổng Cục Thuế Demo')
    .setDescription('API làm việc với Tổng Cục Thuế Demo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //
  SwaggerModule.setup('', app, document);
  //
  // SwaggerModule.setup('', app,document, {
  // customSiteTitle: 'VuVanNghia20206205',
  // customfavIcon: 'https://api.houstongarden.click/docs/favicon-32x32.png',
  // customJs: [
  // 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
  // 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  // ],
  // customCssUrl: [
  // 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  // 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
  // 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  // ],
  // });
  //
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
