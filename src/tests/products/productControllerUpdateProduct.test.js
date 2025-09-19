import { makePOSTWithTokenRequests } from "../../utils/FetchFunctionsTests/postFunctionWithToken.js";
import { makePATCHRequestsProducts } from "../../utils/FetchFunctionsTests/patchFunction.js";
import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js"
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();

describe("Product Controller (updateProduct) Tests", () => {
    
    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("Should be able to update a Product, if the paramethers are ok", async () => {
        
        const user = {
            username: "Isabelle Pierce",
            email: "nivit@cafa.lr",
            password: "5599"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: 5210.50,
            token: data2.accessToken
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.ok(data4.product.hasOwnProperty("product_id"));
        assert.equal(data4.product.product_name, "Smart TV");
        assert.equal(data4.product.price, 5210.50);
        assert.equal(data4.product.category, "TV");
        assert.ok(data4.product.hasOwnProperty("createdAt"));
    });

    it("should not be able to update a product, if user dosen't have or dosen't set a valid (token)", async () => {
        
        const user = {
            username: "Chase Reese",
            email: "igolegec@wamenofe.hm",
            password: "2244"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: 5100.50,
            token: ""
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.strictEqual(data4.message, "jwt must be provided");
    });

    it("should not be able to update a product, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Johnny Klein",
            email: "rub@nalot.vc",
            password: "1199"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: 7600.00,
            token: "FAKE_TOKEN"
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "jwt malformed"
        });

    });

    it("should not be able to update a product, if (token) is not valid", async () => {

        const user = {
            username: "Jay Reid",
            email: "keusauvi@mabed.hn",
            password: "4466"
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

        const data3 = await makePOSTWithTokenRequests(endPoint3, request2);

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: 5210.50,
            token: process.env.INVALID_TOKEN
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid token"
        });

    });

    it("should not be able to update a product, if the (token) signature is not valid", async () => {

        const user = {
            username: "Nicholas George",
            email: "du@bub.ci",
            password: "7799"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: 1210.00,
            token: process.env.FAKE_TOKEN
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "invalid signature"
        });

    });

    it("should not be able to update a product, if user dosen't set a (user_id)", async () => {
    
        const user = {
            username: "Lillie Barrett",
            email: "hafmugu@eril.co.uk",
            password: "4466"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: "",
            price: 1210.00,
            token: data2.accessToken
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Product ID must have a value !"
        });

    });

    it("should not be able to update a product, if user dosen't set a (price)", async () => {
    
        const user = {
            username: "Sue Rios",
            email: "tiwe@ifbu.li",
            password: "1898"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: "",
            token: data2.accessToken
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Price must have a value !"
        });

    });

    it("should not be able to update a product, if user dosen't set a valid (price), float/decimal number", async () => {
    
        const user = {
            username: "Jim Vasquez",
            email: "hi@jez.nz",
            password: "6898"
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: data3.product.product_id,
            price: "FAKE PRICE",
            token: data2.accessToken
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Price must be a float/decimal number !"
        });

    });

    it("should not be able to update a user, if user (user_id) is not valid/wrong", async () => {

        const user = {
            username: "Walter Byrd",
            email: "wan@wi.pe",
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

        const endPoint4 = "updateProduct";
        const request3 = {
            product_id: process.env.FAKE_USER_ID,
            price: 1210.00,
            token: data2.accessToken
        }

        const data4 = await makePATCHRequestsProducts(endPoint4, request3);

        assert.rejects(async () => {
            throw new TypeError(data4.message);
        }, {
            message: "Product not found !"
        });

    });

});