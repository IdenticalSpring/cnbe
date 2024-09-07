import { CloudinaryService } from './cloudinary.service';
export declare class ImagesController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
}
export declare class VideosController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadVideo(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse>;
}
