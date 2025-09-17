import { ProductsModelRepository } from "../models/productsModel.js";
import { ProductsService } from "../services/productsService.js";
import { Middleware } from "../utils/auth/middleware.js";
import { decode } from "jsonwebtoken"
import { once } from "node:events";

export class ProductsController {
    _productsModelRepository;
    _productsService;
    _userMiddleware;

    constructor(productsService = new ProductsService, userMiddleware = new Middleware(), productsModelRepository = new ProductsModelRepository()) {
        this._productsModelRepository = productsModelRepository;
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

    async listProduct(request, response) {

        const checkToken = await this._userMiddleware.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const url = request.url;
            const splitUrl = url.split("/");
            const productId = splitUrl[2];

            if(productId === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Product ID must have a value !" }));
            }

            const findProductById = await this._productsService.listProduct(productId);

            if(!findProductById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "Product not found !" }));
            }

            response.writeHead(200);
            return response.end(JSON.stringify({
                product: {
                    product_id: findProductById.product_id,
                    product_name: findProductById.product_name,
                    price: findProductById.price,
                    category: findProductById.category,
                    createdAt: findProductById.createdAt
                }
            }));

        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

    async updateProduct(request, response) {

        const checkToken = await this._userMiddleware.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const url = request.url;
            const splitUrl = url.split("/");
            const product_id = splitUrl[2];

            if(product_id === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Product ID must have a value !" }));
            }

            const { price } = JSON.parse(await once(request, "data"));

            if(price === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Price must have a value !" }));

            }else if(typeof(price) !== "number") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Price must be a float/decimal number !" }));
            }

            const findProductById = await this._productsModelRepository.findProductById(product_id);

            if(!findProductById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "Product not found !" }));
            }

            const updateProduct = await this._productsService.updateProduct(product_id, price);

            response.writeHead(201);
            return response.end(JSON.stringify({
                product: {
                    product_id: updateProduct.product_id,
                    product_name: updateProduct.product_name,
                    price: updateProduct.price,
                    category: updateProduct.category,
                    createdAt: updateProduct.createdAt
                }
            }));

        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }

    async deleteProduct(request, response) {

        const checkToken = await this._userMiddleware.ensureUserAuthenthicated(request, response);

        if(checkToken === true) {

            const url = request.url;
            const splitUrl = url.split("/");
            const product_id = splitUrl[2];

            if(product_id === "") {
                response.writeHead(401);
                return response.end(JSON.stringify({ message: "Product ID must have a value !" }));
            }

            const findProductById = await this._productsModelRepository.findProductById(product_id);

            if(!findProductById) {
                response.writeHead(404);
                return response.end(JSON.stringify({ message: "Product not found !" }));
            }

            await this._productsService.deleteProduct(product_id);

            response.writeHead(200);
            return response.end(JSON.stringify({ message: "Product deleted with sucess !" }));
        }

        response.writeHead(401);
        return response.end(JSON.stringify({ message: checkToken }));
    }
  
}