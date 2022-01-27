import { Profile, User } from "../types/user"

export const getAvatarImg = (userId: number, email: string, profile: Profile) => {
    return email.startsWith('vl2id0aow1qkrt') && profile.img === null ? `https://picsum.photos/${100+userId}` :
        profile.img === null ? undefined :
        profile.img  
}