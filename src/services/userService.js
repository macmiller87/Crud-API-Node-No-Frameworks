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

    async loginUser(datas) {

        const acessToken = sign({ datas }, process.env.SECRET, {
            subject: datas.user_id,
            audience: "users",
            issuer: "ADMIN",
            expiresIn: process.env.EXPIRES_IN
        });

        await this._userRepository.createUserToken(datas.user_id);

        return acessToken;
    }

    async listUser(user_id) {
        const find = await this._userRepository.findUserById(user_id);
        return find;
    }

}