import { UserModelRepository } from "../models/userModel.js";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export class UserService {

    _userRepository;

    constructor(userRepository = new UserModelRepository()) {
        this._userRepository = userRepository;
    }

    async create(datas) {

        const passwordHash = await hash(datas.password, 8);
        
        let user = {
            user_id: randomUUID(),
            username: datas.username,
            email: datas.email,
            password: passwordHash,
        }

        const createuser = await this._userRepository.createUser(user);

        return createuser;
    }

    async loginUser(user) {

        const acessToken = sign({ user }, process.env.SECRET, {
            subject: user.user_id,
            audience: "users",
            issuer: "ADMIN",
            expiresIn: process.env.EXPIRES_IN
        });

        await this._userRepository.createUserToken(user.user_id);

        return acessToken;
    }

    async listUser(user_id) {
        const find = await this._userRepository.listUser(user_id);
        return find;
    }

    async updateUser(user_id, username) {
        const update = await this._userRepository.updateUser(user_id, username);
        return update;
    }

    async deleteUser(user_id) {
        await this._userRepository.deleteUser(user_id);
    }

}