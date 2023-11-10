import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface User {
    name: string;
    email: string;
    password: string;
}

class ListUserService {
    public async execute(id: string): Promise<User | User[] | null> {
        if(id){
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });     
            return user; 
        } else {
            const users = await prisma.user.findMany();

            return users;
        }
    }
}

export default ListUserService;