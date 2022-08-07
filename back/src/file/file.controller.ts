import {
  Controller,
  Get,
  Header,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.MulterS3.File) {
    return this.fileService.uploadFile(file);
  }

  @Header(
    'Content-Disposition',
    `attachment; filename=${encodeURIComponent('test.txt')}`,
  )
  @Get('download')
  downloadFile() {
    return this.fileService.downloadFile();
  }

  @Header(
    'Content-Disposition',
    `attachment; filename=${encodeURIComponent('s3_download_test.txt')}`,
  )
  @Get('downloads3')
  donwloadFileS3() {
    return this.fileService.downloadFileS3();
  }
}
