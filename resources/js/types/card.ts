export type card = {
    id: number;
    description: string;
    thumbnail: string | null;
    tags: string[];
    author_id: number;
    userpic: string | null;
    author: string;
};