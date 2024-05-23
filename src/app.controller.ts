import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: new S3Client({
          region: "ap-northeast-2", // 리전 정보
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 버킷 액세스 키
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 버킷 비밀 액세스 키
          },
        }),
        bucket: 'minju25kim-bucket', // 버킷명
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const filename = `${Date.now().toString()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
