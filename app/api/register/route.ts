import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';



export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { email, password, name } = body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                hashedPassword,
                name
            }
        });
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}