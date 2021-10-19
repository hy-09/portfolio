

export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// authSlice.ts
export interface PROPS_AUTHEN {
    email: string;
    password: string;
}

export interface PROPS_PROFILE {
    id: number;
    name: string;
    img: File | null;
}

export interface PROPS_NAME {
    name: string;
}

// postSlice.ts
export interface PROPS_NEWPOST {
    content: string;
}

export interface PROPS_LIKEUSERS {
    id: number;
    content: string;
    current: number[];
    new: number;
}

// Post.tsx
export interface PROPS_POST {
    postId: number;
    loginId: number;
    postUser: number;
    content: string;
    imageUrl: string;
    likeUsers: number[];
}