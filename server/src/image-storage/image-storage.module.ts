import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import * as OSS from 'ali-oss';
import { ImageStorageService } from './image-storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.development' })],
  providers: [
    {
      provide: Services.SPACES_CLIENT,
      useValue: new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
        endpoint: 'https://oss-cn-hangzhou.aliyuncs.com',
        bucket: 'fullstack-chat',
      }),
    },
    {
      provide: Services.IMAGE_UPLOAD_SERVICE,
      useClass: ImageStorageService,
    },
  ],
  exports: [
    {
      provide: Services.SPACES_CLIENT,
      useValue: new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
        endpoint: 'https://oss-cn-hangzhou.aliyuncs.com',
      }),
    },
    {
      provide: Services.IMAGE_UPLOAD_SERVICE,
      useClass: ImageStorageService,
    },
  ],
})
export class ImageStorageModule {}
