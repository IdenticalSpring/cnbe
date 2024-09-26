import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';


@Controller('images')
export class ImagesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Can upload for Postman or Thunder Client' })
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      return result;
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw new Error('Failed to upload file');
    }
  }
}


@Controller('videos')
export class VideosController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload video via Postman or Thunder Client' })
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadVideo(file);
      return result;
    } catch (error) {
      console.error('Error uploading video: ', error);
      throw new Error('Failed to upload video');
    }
  }
}
