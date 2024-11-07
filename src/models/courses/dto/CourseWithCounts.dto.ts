export interface CourseWithCounts {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    chapterCount: number;
    itemCount: number;
}