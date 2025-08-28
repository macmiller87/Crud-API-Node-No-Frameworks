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
        const create = await this._database._prismaService.userTokens.create({
            data: {
                user_id: user_id
            }
        });

        return create;
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