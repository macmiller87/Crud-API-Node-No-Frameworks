import { UserController } from "../controllers/userController.js";
import { ProductsController } from "../controllers/productsController.js";

const userController = new UserController();
const productController = new ProductsController();

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
            
            case "/deleteUser/":
                await userController.deleteUser(request, response);
                break;

            case "/createProduct":
                await productController.createProduct(request, response);
                break;

            case "/listProduct/":
                await productController.listProduct(request, response);
                break;

            case "/updateProduct/":
                await productController.updateProduct(request, response);
                break;

            case "/deleteProduct/":
                await productController.deleteProduct(request, response);
                break;
            
            default:
                response.writeHead(404);
                response.end(JSON.stringify({ message: "Route not found !" }));
                break;
        }

    }

}