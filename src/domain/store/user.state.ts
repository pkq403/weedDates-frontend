import { create } from 'zustand'
export type Me = {
    email: string;
    id: number;
};

export type UserState = {
    me: Me;
    setMe(me: Me): void;
}

export const useUserState = create<UserState>((set, get) => ({
    me: {} as any,
    setMe(me) {
        set({me})
    }
}))