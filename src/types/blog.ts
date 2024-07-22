export interface Blog {
    title: string;
    description: string;
    tags: string[];
    url: string;
    image: string;
    isPublished: boolean;
    publishedAt: string;  // ISO string
}