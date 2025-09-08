import { UserControllerTests } from "../controllers/userControllerTests.js";

const userControllerTests = new UserControllerTests();

export class UserRoutesTests {
    
    async handler(request, response) {

        const splitUrl = request.url.split("/");
        const pathName = "/" + splitUrl[1];

        const checkHttpMethod = request.method === "POST" ? pathName : pathName + "/";

        switch(checkHttpMethod) {
            
            case "/createUser":
                await userControllerTests.createUser(request, response);
                break;

            case "/loginUser":
                await userControllerTests.loginUser(request, response);
                break;

            case "/listUser/":
                await userControllerTests.listUser(request, response);
                break;

            case "/updateUser/":
                await userControllerTests.updateUser(request, response);
                break;
            
            case "/deleteUser/":
                await userControllerTests.deleteUser(request, response);
                break;
            
            default:
                response.writeHead(404);
                response.end(JSON.stringify({ message: "Route not found !" }));
                break;
        }

    }

}