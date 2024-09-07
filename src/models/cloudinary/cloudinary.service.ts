import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(
    fileName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        fileName,
        { folder: 'MasterCoding' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }
  async uploadVideo(filePath: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        filePath,
        { resource_type: 'video', folder: 'MasterCoding' }, // Specify resource type as 'video'
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );
    });
  }
}
