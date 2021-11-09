import { Company } from "./stock"
import { User } from "./user"

export type LikeUsers = {
    id: number;
    content: string;
    current: number[];
    new: number;
}

export type Post = {
    id: number;
    content: string;
    price: number;
    quantity: number;
    buy_or_sell: 'buy' | 'sell';
    created_at: string;
    user: User;
    company: Company;
    likeUsers: Array<number>;
}