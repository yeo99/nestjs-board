import { INestApplication } from "@nestjs/common";
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions
} from "@nestjs/swagger";

// Swagger 새로고침해도 Token값 유지
const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    }
}

/**
 * @author yeo99
 * @description Swagger 세팅
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('NestJS Test API Docs')
        .setDescription('NestJS Test API description')
        .setVersion('1.0.0')
        /**
         * JWT 토큰 설정
         */
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header'
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions)
}