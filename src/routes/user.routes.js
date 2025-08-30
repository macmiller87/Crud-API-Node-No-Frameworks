import { UserController } from "../controllers/userController.js";

const userController = new UserController();

export class UserRoutes {
    
    async handler(request, response) {

        const splitUrl = request.url.split("/");
        const pathName = "/" + splitUrl[1];

        const checkHttpMethod = request.method === "POST" ? pathName : pathName + "/";

        switch(checkHttpMethod) {
            
            case "/createUser":
                await userController.createUser(request, response);
                break;

            case "/loginUser":
                await userController.loginUser(request, response);
                break;

            case "/listUser/":
                await userController.listUser(request, response);
                break;

            case "/updateUser/":
                await userController.updateUser(request, response);
                break;
            
            default:
                response.writeHead(404);
                response.end(JSON.stringify({ message: "Route not found !" }));
                break;
        }

    }

}