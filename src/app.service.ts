import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AWS 인스턴스 배포 완료!';
  }
}
