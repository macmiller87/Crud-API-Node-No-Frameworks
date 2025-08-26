import { UserController } from "../controllers/userController.js";

const userController = new UserController();

export class UserRoutes {

    async handler(request, response) {

        if(request.url.startsWith("/createUser") && request.method === "POST") {
            return await userController.createUser(request, response);
        }

        if(request.url.startsWith("/loginUser") && request.method === "POST") {
            return await userController.loginUser(request, response);
        }

    }

}