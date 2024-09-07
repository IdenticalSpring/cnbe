import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(fileName: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadVideo(filePath: string): Promise<UploadApiResponse>;
}
