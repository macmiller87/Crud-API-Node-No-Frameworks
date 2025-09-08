import { UserModelRepositoryTests } from "../model/userModelTests.js";
import { UserServiceTests } from "../service/userServiceTests.js"
import { MiddlewareTests } from "../auth/middlewareTests.js";
import { compare } from "bcryptjs";
import { once } from "node:events";

export class UserControllerTests {
    _userService_Tests;
    _userModelRepository_Tests;
    _userMiddleware_Tests;

    constructor(userModelRepository_Tests = new UserModelRepositoryTests(), userService_Tests = new UserServiceTests(), userMiddleware_Tests = new MiddlewareTests()) {
        this._userModelRepository_Tests = userModelRepository_Tests;
        this._userService_Tests = userService_Tests;
        this._userMiddleware_Tests = userMiddleware_Tests;
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

            const findUserByEmail = await this._userModelRepository_Tests.findUserByEmail(email);

            if(!findUserByEmail) {

                const createUser = await this._userService_Tests.create({
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

        const findUserByEmail = await this._userModelRepository_Tests.findUserByEmail(email);

        if(!findUserByEmail) {
            response.writeHead(404);
            return response.end(JSON.stringify({ message: "User email not found or wrong !" }));
        }

        const passwordMatch = await compare(password, findUserByEmail.password);

        if(!passwordMatch) {
            response.writeHead(401);
            return response.end(JSON.stringify({ message: "User password wrong !" }));
        }

        const userLogin = await this._userService_Tests.loginUser(findUserByEmail);

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

    async listUser(request, response) {

        const checkToken = await this._userMiddleware_Tests.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const url = request.url;
            const splitUrl = url.split("/");
            const user_id = splitUrl[2];

            if(user_id === "" || user_id === undefined) {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "User ID must have a value !" }));
            }

            const findUserById = await this._userService_Tests.listUser(user_id);

            if(!findUserById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "User not found !" }));
            }

            response.writeHead(200);
            return response.end(JSON.stringify({
                user: {
                    user_id: findUserById.user_id,
                    username: findUserById.username,
                    email: findUserById.email,
                    createdAt: findUserById.createdAt
                }
            }));

        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

    async updateUser(request, response) {

        const checkToken = await this._userMiddleware_Tests.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const { username } = JSON.parse(await once(request, "data"));

            const url = request.url;
            const splitUrl = url.split("/");
            const user_id = splitUrl[2];

            if(user_id === "" || username === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "All data must have a value !" }));
            }

            const findUserById = await this._userModelRepository_Tests.findUserById(user_id);

            if(!findUserById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "User not found !" }));
            }

            const updateUserField = await this._userService_Tests.updateUser(user_id, username);

            response.writeHead(201);
            return response.end(JSON.stringify({
                user: {
                    user_id: updateUserField.user_id,
                    username: updateUserField.username,
                    email: updateUserField.email,
                    createdAt: updateUserField.createdAt
                }
            }));

        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

    async deleteUser(request, response) {

        const checkToken = await this._userMiddleware_Tests.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const url = request.url;
            const splitUrl = url.split("/");
            const user_id = splitUrl[2];

            if(user_id === "" || user_id === undefined) {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "User id must have a value !" }));
            }

            const findUserById = await this._userModelRepository_Tests.findUserById(user_id);

            if(!findUserById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "User not found !" }));
            }

            await this._userService_Tests.deleteUser(user_id);

            response.writeHead(200);
            return response.end(JSON.stringify({ message: "User deleted with sucess !" }));
        }
        
        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

}