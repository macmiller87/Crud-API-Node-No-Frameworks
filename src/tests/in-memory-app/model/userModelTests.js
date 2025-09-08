import { PrismaServiceTests } from "../../in-memory-app/database/prismaServiceTests.js";

export class UserModelRepositoryTests {
    _database;

    constructor(prismaServiceTests = new PrismaServiceTests()) {
        this._database = prismaServiceTests;
    }

    async createUser(datas) {
        const create = await this._database._prismaServiceTests.users_Tests.create({
            data: datas
        });

        return create;
    }

    async createUserToken(user_id) {
        const create = await this._database._prismaServiceTests.userTokens_Tests.create({
            data: {
                user_id: user_id
            }
        });

        return create;
    }

    async updateUser(user_id, username) {
        const update = await this._database._prismaServiceTests.users_Tests.update({
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
        await this._database._prismaServiceTests.users_Tests.delete({
            where: {
                user_id: user_id
            }
        });

    }

    async findUserByEmail(email) {
        const find = await this._database._prismaServiceTests.users_Tests.findUnique({
            where: {
                email: email
            }
        });

        return find;
    }

    async findUserById(user_id) {
        const find = await this._database._prismaServiceTests.users_Tests.findFirst({
            where: {
                user_id: user_id
            }
        });

        return find;
    }

}