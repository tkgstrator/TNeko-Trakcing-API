import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["verbose"] });
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle("TNeko Trarcking API Document")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
