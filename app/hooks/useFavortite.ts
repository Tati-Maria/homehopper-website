import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import {toast} from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(!currentUser) {
            loginModal.onOpen();
            return;
        }

        try {
            let request;

            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success("Favorite updated");
        } catch (error: any) {
            toast.error(error.message);
        }
    }, [ currentUser, loginModal, hasFavorited, listingId, router ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;