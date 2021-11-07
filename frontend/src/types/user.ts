export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

export type Auth = {
    email: string;
    password: string;
}

export type User = {
    id: number;
    email: string;
    fund: number;
}

export type UpdateFund = {
    user_id: number;
    fund: number;
}

export type Profile = {
    id: number;
    name: string;
    img: string | undefined;
    user: User;
    created_at: string;
}

export type EditProfile = {
    id: number;
    name: string;
    img: File | null;
}

export type Name = {
    name: string;
}

