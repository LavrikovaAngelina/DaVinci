export type card = {
    id: number;
    description: string;
    thumbnail: string | null;
    tags: string[];
    author: string;
    likes: number;
    dislikes: number;
    created_at: string;
};