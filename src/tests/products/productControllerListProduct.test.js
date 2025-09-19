import { makePOSTWithTokenRequests } from "../../utils/FetchFunctionsTests/postFunctionWithToken.js";
import { makeGETRequestsProducts } from "../../utils/FetchFunctionsTests/getFunction.js";
import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js"
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();

describe("Product Controller (listProduct) Tests", () => {
    
    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("Should be able to list a Product, if the paramethers are ok", async () => {
        
        const user = {
            username: "Beulah Barnes",
            email: "jertas@hinan.at",
            password: "6699"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: data2.accessToken
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.ok(data4.product.hasOwnProperty("product_id"));
        assert.equal(data4.product.product_name, "Smart TV");
        assert.equal(data4.product.price, 5200.10);
        assert.equal(data4.product.category, "TV");
        assert.ok(data4.product.hasOwnProperty("createdAt"));
    });

    it("should not be able to list a product, if user dosen't have or dosen't set a valid (token)", async () => {
    
        const user = {
            username: "Nell Roberson",
            email: "lu@itovon.kp",
            password: "6688"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: ""
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.strictEqual(data4.message, "jwt must be provided");
    });

    it("should not be able to list a product, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Zachary Snyder",
            email: "rinu@upepo.mp",
            password: "3355"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: "FAKE_TOKEN"
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "jwt malformed"
        });

    });

    it("should not be able to list a product, if (token) is not valid", async () => {

        const user = {
            username: "JDanny Ross",
            email: "pojkojmi@huju.cz",
            password: "9933"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: "",
            token: process.env.INVALID_TOKEN
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid token"
        });

    });

    it("should not be able to list a product, if the (token) signature is not valid", async () => {

        const user = {
            username: "Sara Bridges",
            email: "tedgup@rakow.ms",
            password: "2266"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: data3.product.product_id,
            token: process.env.FAKE_TOKEN
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid signature"
        });

    });

    it("should not be able to List a product, if user dosen't set a (user_id)", async () => {

        const user = {
            username: "Micheal Reeves",
            email: "libuguh@efiuh.pm",
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: "",
            token: data2.accessToken
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
          message: "Product ID must have a value !"
        });

    });

    it("should not be able to List a user, if user (user_id) is not valid/wrong", async () => {

        const user = {
            username: "Rosetta Butler",
            email: "suuncaw@uwge.ps",
            password: "6688"
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

        const endPoint4 = "listProduct";
        const request3 = {
            product_id: process.env.FAKE_USER_ID,
            token: data2.accessToken
        }

        const data4 = await makeGETRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
          message: "Product not found !"
        });

    });

});