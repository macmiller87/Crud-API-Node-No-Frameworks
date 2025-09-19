import { PrismaService } from "../database/prisma/prismaService.js";

export class UserModelRepository {
    _database;

    constructor(prismaService = new PrismaService()) {
        this._database = prismaService;
    }

    async createUser(datas) {
        const create = await this._database._prismaService.users.create({
            data: datas
        });

        return create;
    }

    async createUserToken(user_id) {
        await this._database._prismaService.userTokens.create({
            data: {
                user_id: user_id
            }
        });  
    }

    async listUser(user_id) {
        const listUser = await this._database._prismaService.users.findUnique({
            where: {
                user_id: user_id
            },
            include: {
                Products: true
            }
        });

        return listUser;
    }

    async updateUser(user_id, username) {
        const update = await this._database._prismaService.users.update({
            where: {
                user_id: user_id
            },
            data: {
                username: username
            }
        });

        return update;
    }

    async deleteUser(user_id) {
        await this._database._prismaService.users.delete({
            where: {
                user_id: user_id
            }
        });
    }

    async findUserByEmail(email) {
        const find = await this._database._prismaService.users.findUnique({
            where: {
                email: email
            }
        });

        return find;
    }

    async findUserById(user_id) {
        const find = await this._database._prismaService.users.findFirst({
            where: {
                user_id: user_id
            }
        });

        return find;
    }

}