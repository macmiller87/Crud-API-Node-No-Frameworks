import { UserModelRepositoryTests } from "../model/userModelTests.js";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export class UserServiceTests {

    _userRepository_tests;

    constructor(userRepository_tests = new UserModelRepositoryTests()) {
        this._userRepository_tests = userRepository_tests;
    }

    async create(datas) {

        const passwordHash = await hash(datas.password, 8);
        
        let user = {
            user_id: randomUUID(),
            username: datas.username,
            email: datas.email,
            password: passwordHash,
        }

        const createuser = await this._userRepository_tests.createUser(user);

        return createuser;
    }

    async loginUser(datas) {

        const acessToken = sign({ datas }, process.env.SECRET, {
            subject: datas.user_id,
            audience: "users",
            issuer: "ADMIN",
            expiresIn: process.env.EXPIRES_IN
        });

        await this._userRepository_tests.createUserToken(datas.user_id);

        return acessToken;
    }

    async listUser(user_id) {
        const find = await this._userRepository_tests.findUserById(user_id);
        return find;
    }

    async updateUser(user_id, username) {
        const update = await this._userRepository_tests.updateUser(user_id, username);
        return update;
    }

    async deleteUser(user_id) {
        await this._userRepository_tests.deleteUser(user_id);
    }

}