import { makePOSTWithTokenRequests } from "../../utils/FetchFunctionsTests/postFunctionWithToken.js";
import { makeDELETERequestsProducts } from "../../utils/FetchFunctionsTests/deleteFunction.js";
import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js"
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();

describe("Product Controller (deleteProduct) Tests", () => {
    
    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("Should be able to delete a Product, if the paramethers are ok", async () => {
        
        const user = {
            username: "Arthur Maldonado",
            email: "ku@ez.no",
            password: "3898"
        }

        const endPoint = "createUser";
        await makePOSTRequests(endPoint, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Smart TV",
            price: 5200.10,
            category: "TV",
            token: data2.accessToken
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: data2.accessToken
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.strictEqual(data4.message, "Product deleted with sucess !");
    });

    it("should not be able to delete a product, if user dosen't have or dosen't set a valid (token)", async () => {
        
            const user = {
            username: "Sarah Sutton",
            email: "salsigve@padrot.jm",
            password: "4565"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Playstation 5",
            price: 5000.50,
            category: "Video game",
            token: data2.accessToken
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: ""
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.strictEqual(data4.message, "jwt must be provided");
    });
    
    it("should not be able to delete a product, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Mabelle Cobb",
            email: "omuruzic@keficab.sv",
            password: "4676"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Nootebook",
            price: 7500.00,
            category: "Computer",
            token: data2.accessToken
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: "FAKE_TOKEN"
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "jwt malformed"
        });

    });

    it("should not be able to delete a product, if (token) is not valid", async () => {

        const user = {
            username: "Beulah Summers",
            email: "piz@ga.cl",
            password: "4787"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "DVD",
            price: 800.10,
            category: "Dvd",
            token: data2.accessToken
        }

        await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: "",
            token: process.env.INVALID_TOKEN
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid token"
        });

    });

    it("should not be able to delete a product, if the (token) signature is not valid", async () => {

        const user = {
            username: "Jeff Ryan",
            email: "upeilpel@newufpok.ly",
            password: "2398"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Monitor",
            price: 1000.00,
            category: "Computer Items",
            token: data2.accessToken
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: process.env.FAKE_TOKEN
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid signature"
        });

    });

     it("should not be able to delete a product, if user dosen't set a (user_id)", async () => {
    
        const user = {
            username: "Cecilia Lawson",
            email: "gi@nifofvel.au",
            password: "3377"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Monitor",
            price: 1000.00,
            category: "Computer Items",
            token: data2.accessToken
        }

        await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: "",
            token: data2.accessToken
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Product ID must have a value !"
        });

    });

    it("should not be able to delete a user, if user (user_id) is not valid/wrong", async () => {

        const user = {
            username: "Larry Parker",
            email: "nucha@joakauk.ml",
            password: "1234"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Monitor",
            price: 1000.00,
            category: "Computer Items",
            token: data2.accessToken
        }

        await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "deleteProduct";
        const request3 = {
            product_id: process.env.FAKE_USER_ID,
            token: data2.accessToken
        }

        const data4 = await makeDELETERequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Product not found !"
        });

    });

});