import {getServerSession} from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

//get current user from session
//if user is not found in db, return null

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession();
        if(!session?.user?.email) return null;

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser) return null;

        return currentUser;

    } catch (error: any) {
        return null;
    }
}