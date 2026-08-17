import { tag } from "./tag";

export type idea = {
    tag_id_1: tag;
    tag_id_2: tag;
    tag_id_3: tag;
};

export type task = {
    id: number;
    user_id: number;
    idea: idea;
};