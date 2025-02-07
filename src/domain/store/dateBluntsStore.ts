import { create } from 'zustand';

type BluntDateStore = {
    date?: Date,
    blunts?: number,
    setDate: (d: Date) => void;
    setBlunts: (d: number) => void;
} 

export const useBluntDateStore = create<BluntDateStore>(set => ({
    date: undefined,
    blunts: undefined,
    setDate: (d) => set({date: d}),
    setBlunts: (b) => set({blunts: b})
}))