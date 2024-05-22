import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @HttpCode(HttpStatus.OK) // 이 데코레이터는 응답 코드를 200으로 설정합니다.
  getHealth() {
    return { message: 'This is a successful response!' };
  }
}
