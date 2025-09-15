import { ProductsService } from "../services/productsService.js";
import { Middleware } from "../utils/auth/middleware.js";
import { decode } from "jsonwebtoken"
import { once } from "node:events";

export class ProductsController {
    _productsService;
    _userMiddleware;

    constructor(productsService = new ProductsService, userMiddleware = new Middleware()) {
        this._productsService = productsService;
        this._userMiddleware = userMiddleware;
    }

    async createProduct(request, response) {

        const checkToken = await this._userMiddleware.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const { product_name, price, category } = JSON.parse(await once(request, "data"));

            if(product_name === "" || price === "" || category === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "All data must have a value !" }));

            }else if(typeof(product_name) !== "string" || typeof(category) !== "string") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "ProductName and Cataegory must be a string !" }));

            }else if(typeof(price) !== "number") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Price must be a float/decimal number !" }));
            }

            const authToken = request.headers.authorization;
            const [, token] = authToken.split(' ');
            const getUserId = decode(token);

            const createProduct = await this._productsService.create({
                product_name,
                price,
                category,
                user_id: getUserId.user.user_id
            });

            return response.end(JSON.stringify({
                product: {
                    user_id: createProduct.user_id,
                    product_id: createProduct.product_id,
                    product_name: createProduct.product_name,
                    price: createProduct.price,
                    category: createProduct.category,
                    createdAt: createProduct.createdAt
                }
            }));

        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

}