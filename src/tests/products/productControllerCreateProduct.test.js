import { makePOSTWithTokenRequests } from "../../utils/FetchFunctionsTests/postFunctionWithToken.js";
import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js"
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();

describe("Product Controller (createProduct) Tests", () => {
    
    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("Should be able to create a new Product", async () => {
        
        const user = {
            username: "Margaret Richards",
            email: "ekzo@fezihov.mt",
            password: "2434"
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

        assert.ok(data3.product.hasOwnProperty("user_id"));
        assert.ok(data3.product.hasOwnProperty("product_id"));
        assert.equal(data3.product.product_name, "Smart TV");
        assert.equal(data3.product.price, 5200.10);
        assert.equal(data3.product.category, "TV");
        assert.ok(data3.product.hasOwnProperty("createdAt"));
    });

    it("should not be able to create a product, if user dosen't have or dosen't set a valid (token)", async () => {

        const user = {
            username: "Claudia Greene",
            email: "ozvut@bac.br",
            password: "1199"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Playstation 5",
            price: 5000.50,
            category: "Video game",
            token: ""
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        assert.strictEqual(data3.message, "jwt must be provided");
    });

    it("should not be able to create a product, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Victor Andrews",
            email: "dumpeuf@sulucep.ad",
            password: "2244"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Nootebook",
            price: 7500.00,
            category: "Computer",
            token: "FAKE_TOKEN"
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "jwt malformed"
        });

    });

    it("should not be able to create a product, if (token) is not valid", async () => {

        const user = {
            username: "Steve Rodgers",
            email: "owpu@tovekhij.ar",
            password: "8822"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "DVD",
            price: 800.10,
            category: "Dvd",
            token: process.env.INVALID_TOKEN
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "invalid token"
        });

    });

    it("should not be able to create a product, if the (token) signature is not valid", async () => {

        const user = {
            username: "Minnie Ortiz",
            email: "animec@uf.dk",
            password: "6644"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        await makePOSTRequests(endPoint2, request);

        const endPoint3 = "createProduct";
        const request2 = {
            product_name: "Monitor",
            price: 1000.00,
            category: "Computer Items",
            token: process.env.FAKE_TOKEN
        }

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "invalid signature"
        });

    });

});