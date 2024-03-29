import { Company } from "./stock"
import { User } from "./user"

export type Post = {
    id: number;
    content: string;
    price: number;
    quantity: number;
    buy_or_sell: 'buy' | 'sell';
    profit_or_loss_price: number | null;
    created_at: string;
    user: User;
    company: Company;
    likeUsers: Array<number>;
}

export type CreatPost = {
    content: string;
    price: number;
    quantity: number;
    buy_or_sell: 'buy' | 'sell';
    profit_or_loss_price: number | null;
    user_id: number;
    company_id: number;
    created_at: string;
}

export type PatchPost = {
    id: number;
    content?: string;
    likeUsers?: Array<number>;
}