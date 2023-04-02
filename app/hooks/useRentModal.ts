import {create} from "zustand";

interface RentModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useRentModal = create<RentModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));