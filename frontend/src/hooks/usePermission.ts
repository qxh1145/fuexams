import { useAppSelector } from "./useRedux";
import {ROLES} from '@/constants/roles'

export const usePermission = () =>{
    const { currentUser } = useAppSelector((state) => state.auth)

    //logic kiem tra vai tro
    const isAdmin = currentUser?.role === ROLES.ADMIN;
    const isBasic = currentUser?.role === ROLES.BASIC;
    const isPremium = currentUser?.role === ROLES.PREMIUM;

    //logic phan cap
    //admin luon co quyen cua premium

    const canAccessPremiumContent = isAdmin || isPremium;


    //kiem tra quyen so huu
    const isOwner = (authorId: string) => {
        return currentUser?.id == authorId;
    }   

    return {
        role: currentUser?.role,
        isAdmin,
        isBasic,
        isPremium,
        canAccessPremiumContent,
        isOwner,
    }
}