

export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// authSlice.ts
export type Auth = {
    email: string;
    password: string;
}

export type User = {
    id: number;
    email: string;
}

export type Profile = {
    id: number;
    name: string;
    img: File | null;
}

export type Name = {
    name: string;
}

// postSlice.ts
export type NewPost = {
    content: string;
}

export type LikeUsers = {
    id: number;
    content: string;
    current: number[];
    new: number;
}

// Post.tsx
export type Post = {
    postId: number;
    loginId: number;
    postUser: number;
    content: string;
    imageUrl: string;
    likeUsers: number[];
}