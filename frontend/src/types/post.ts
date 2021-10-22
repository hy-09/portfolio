export type NewPost = {
    content: string;
}

export type LikeUsers = {
    id: number;
    content: string;
    current: number[];
    new: number;
}

export type Post = {
    postId: number;
    loginId: number;
    postUser: number;
    content: string;
    imageUrl: string;
    likeUsers: number[];
}