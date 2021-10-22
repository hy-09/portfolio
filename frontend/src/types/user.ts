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

