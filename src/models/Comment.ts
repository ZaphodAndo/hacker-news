export type Comment = {
    comments: Array<Comment>;
    content: string;
    id: number;
    level: number;
    time: number;
    user: string;
};
