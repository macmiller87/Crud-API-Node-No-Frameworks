import { PrismaService } from "../database/prisma/prismaService.js";

export class UserModelRepository {
    _database;

    constructor(prismaService = new PrismaService()) {
        this._database = prismaService;
    }

    async createuser(datas) {
        const create = await this._database._prismaService.users.create({
            data: datas
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

}