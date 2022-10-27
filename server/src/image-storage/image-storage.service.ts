import {
  UploadGroupMessageAttachmentParams,
  UploadImageParams,
  UploadMessageAttachmentParams,
} from './../utils/types';
import * as OSS from 'ali-oss';
import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { compressImage } from 'src/utils/helpers';
import { GroupMessageAttachment } from 'src/utils/typeorm';
import { IImageStorageService } from './image-storage';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageStorageService implements IImageStorageService {
  constructor(
    @Inject(Services.SPACES_CLIENT)
    private readonly spacesClient: OSS,
  ) {}

  upload(params: UploadImageParams) {
    // fix chinese filename encoding issue
    // const fileName = Buffer.from(params.file.originalname, 'latin1').toString(
    //   'utf8',
    // );
    const fileName = `${params.key}.${params.file.mimetype.split('/')[1]}`;
    const fileDirectory = path.resolve(__dirname, '../public');
    const filePath = fileDirectory + fileName;
    fs.mkdirSync(fileDirectory, { recursive: true });
    fs.writeFile(filePath, Buffer.from(params.file.buffer), async (err) => {
      if (!err) {
        await this.spacesClient.put(fileName, filePath);
      }
    });
    return fileName;
  }

  async uploadMessageAttachment(params: UploadMessageAttachmentParams) {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }

  async uploadGroupMessageAttachment(
    params: UploadGroupMessageAttachmentParams,
  ): Promise<GroupMessageAttachment> {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }
}
