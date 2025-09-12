import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js";
import { makePATCHRequests } from "../../utils/FetchFunctionsTests/patchFunction.js";
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";                                                                     

const prismaService = new PrismaService();

describe("UserController (updateUser) Tests", () => {

    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("should be able to update a user, if the paramethers are ok", async () => {

        const user = {
            username: "Herman Tyler",
            email: "neragawi@pisseb.hk",
            password: "7733"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "Herman Tylerr",
            token: data2.accessToken
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.ok(data3.user.hasOwnProperty("user_id"));
        assert.strictEqual(data3.user.username, "Herman Tylerr");
        assert.equal(data3.user.email, user.email);
        assert.ok(data3.user.hasOwnProperty("createdAt"));
    });

    it("should not be able to Update a user, if user dosen't have or dosen't set a valid (token)", async () => {
    
        const user = {
            username: "Lloyd Robinson",
            email: "jeclezan@vu.fk",
            password: "5577"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "Lloyd Robinsonnme",
            token: ""
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.strictEqual(data3.message, "jwt must be provided");
    });
    
    it("should not be able to Update a user, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Terry Fisher",
            email: "hif@gij.tw",
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

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "Terry Fishner",
            token: "FAKE_TOKEN"
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "jwt malformed"
        });

    });
    
    it("should not be able to Update a user, if (token) is not valid", async () => {

        const user = {
            username: "Noah Williamson",
            email: "suit@zizeaka.fr",
            password: "8811"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "Noah Fisher",
            token: process.env.INVALID_TOKEN
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "invalid token"
        });

    });
    
    it("should not be able to Update a user, if the (token) signature is not valid", async () => {

        const user = {
            username: "Brandon Howell",
            email: "ec@zojki.tg",
            password: "4477"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "Brandon",
            token: process.env.FAKE_TOKEN
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "invalid signature"
        });

    });

    it("should not be able to Update a user, if user dosen't set a (user_id)", async () => {

        const user = {
            username: "Don Saunders",
            email: "pe@okezafko.gb",
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

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: "",
            username: "Don Cornelius",
            token: data2.accessToken
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "All data must have a value !"
        });

    });

    it("should not be able to Update a user, if user dosen't set a (username)", async () => {

        const user = {
            username: "Sam Jimenez",
            email: "hezes@gomu.af",
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

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: data2.user.user_id,
            username: "",
            token: data2.accessToken
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "All data must have a value !"
        });

    });
    
    it("should not be able to Update a user, if (user_id) is not valid/wrong", async () => {

        const user = {
            username: "Martha Hubbard",
            email: "fe@maf.ck",
            password: "9988"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "updateUser";
        const request2 = {
            user_id: process.env.FAKE_USER_ID,
            username: "Martha",
            token: data2.accessToken
        }

        const data3 = await makePATCHRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "User not found !"
        });

    });

});