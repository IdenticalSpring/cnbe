import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';

// http://localhost:8080/images/upload [POST]
// [FormData] => Key:image [File]
@Controller('images')
export class ImagesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Can upload for Postman or Thunder Client' })
  @UseInterceptors(FileInterceptor('image'))
  //   @UseInterceptors(FileInterceptor('video'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file.path);
      return result;
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw new Error('Failed to upload file');
    }
  }
}

// http://localhost:8080/videos/upload [POST]
// [FormData] => Key:videos [File]
@Controller('videos')
export class VideosController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload video via Postman or Thunder Client' })
  @UseInterceptors(FileInterceptor('video')) // Handle video file uploads
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadVideo(file.path); // Adjust to upload video
      return result;
    } catch (error) {
      console.error('Error uploading video: ', error);
      throw new Error('Failed to upload video');
    }
  }
}
