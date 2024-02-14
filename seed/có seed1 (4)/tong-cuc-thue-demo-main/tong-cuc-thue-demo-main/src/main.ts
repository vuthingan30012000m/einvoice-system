import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CoQuanThueService } from './co-quan-thue/co-quan-thue.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tổng Cục Thuế Demo')
    .setDescription('API làm việc với TCT.')
    .setVersion('1.0')
    // .addTag('Doanh Nghiệp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  // await app.listen(3000);
  app.listen(3000, async () => {
    const coQuanThueService = app.get(CoQuanThueService);
    coQuanThueService.default();
  });
}
bootstrap();
