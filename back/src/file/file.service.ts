import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import Aws from 'aws-sdk';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import internal from 'stream';
import { createReadStream } from 'fs';
import path from 'path';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return { filePath: file.location };
  }

  downloadFile() {
    // express 방식 (1)
    // res.set({ 'Content-Disposition': `attachment; filename=set.txt` });
    // const stream = createReadStream(
    //   path.join(process.cwd(), 'uploads/test.txt'),
    // );
    // stream.pipe(res);

    // express 방식 (2)
    // const fileName = encodeURIComponent('한글파일.txt');
    // res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // res.sendFile(path.join(process.cwd(), 'uploads/test.txt')); // 내부에서 stream pipe

    // express 방식 (3) passthrough :false 여야함
    // res.download(path.join(process.cwd(), 'uploads/test.txt'), '테스트.txt'); // res.sendfile사용

    const stream = createReadStream(
      path.join(process.cwd(), 'uploads/test.txt'),
    );
    return new StreamableFile(stream);
  }

  async downloadFileS3() {
    // const s3 = new Aws.S3({
    //   region: this.configService.get('AWS_BUCKET_REGION'),
    //   credentials: {
    //     accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    //     secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    //   },
    // });

    // const options = {
    //   Bucket: this.configService.get('AWS_BUCKET_NAME'),
    //   Key: 'test.txt',
    // };

    // const stream = s3.getObject(options).createReadStream();

    // return new StreamableFile(stream);

    const s3 = new S3Client({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    const options = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: 'test.txt',
    };

    const { Body } = await s3.send(new GetObjectCommand(options));

    return new StreamableFile(Body as internal.Readable);
  }
}
