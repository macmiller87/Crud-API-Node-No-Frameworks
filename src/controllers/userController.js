import { compare } from "bcryptjs";
import { UserModelRepository } from "../models/userModel.js";
import { UserService } from "../services/userService.js"
import { once } from "node:events";

export class UserController {
    _userService;
    _userModelRepository;

    constructor(userModelRepository = new UserModelRepository(), userService = new UserService()) {
        this._userModelRepository = userModelRepository;
        this._userService = userService;
    }

    async createUser(request, response) {

        const { username, email, password } = JSON.parse(await once(request, "data"));

        if(username === "" || email === "" || password === "" ) {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "All data must have a valaue, please check !" }));

        }else if(typeof(username) != "string" || typeof(email) !== "string" || typeof(password) !== "string") {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "All data must be a string !" }));

        }else {

            const regexMail = /^\S+@\S+\.\S+$/;

            if(!regexMail.test(email)) {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Please Put a Valid Email !" }));
            }

            const findUserByEmail = await this._userModelRepository.findUserByEmail(email);

            if(!findUserByEmail) {

                const createUser = await this._userService.create({
                    username,
                    email,
                    password
                });

                response.writeHead(201);
                return response.end(JSON.stringify({
                    user: {
                        user_id: createUser.user_id,
                        username: createUser.username,
                        email: createUser.email,
                        createdAt: createUser.createdAt
                    }
                }));

            }

           response.writeHead(401);
           return response.end(JSON.stringify({ message: "User email is already in use !" }));

        }

    }

    async loginUser(request, response) {

        const {email, password} = JSON.parse(await once(request, "data"));

        if(email === "" || password === "") {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "All data must have a value !" }));

        }else if(typeof(email) !== "string" || typeof(password) !== "string")  {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "All data must to be a string !" }));
        }    

        const regexMail = /^\S+@\S+\.\S+$/;
        
        if(!regexMail.test(email)) {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "Please Put a Valid Email !" }));
        }

        const findUserByEmail = await this._userModelRepository.findUserByEmail(email);

        if(!findUserByEmail) {
            response.writeHead(404);
            return response.end(JSON.stringify({ message: "User email not found or wrong !" }));
        }

        const passwordMatch = compare(password, findUserByEmail.password);

        if(!passwordMatch) {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "User password wrong !" }));
        }

        const userLogin = await this._userService.loginUser(findUserByEmail);

        response.writeHead(201);
        return response.end(JSON.stringify({
            user: {
                user_id: findUserByEmail.user_id,
                username: findUserByEmail.username,
                email: findUserByEmail.email,
                createdAt: findUserByEmail.createdAt
            },
            accessToken: userLogin
        }));

    }

}