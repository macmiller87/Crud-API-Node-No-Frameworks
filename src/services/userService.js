import { UserModelRepository } from "../models/userModel.js";
import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

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

        const createuser = await this._userRepository.createuser(user);

        return createuser;
    }

}