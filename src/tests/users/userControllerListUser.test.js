import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js";
import { makeGETRequests } from "../../utils/FetchFunctionsTests/getFunction.js";
import { PrismaServiceTests } from "../in-memory-app/database/prismaServiceTests.js"
import { describe, it, before, after } from "node:test";
import assert from "node:assert";                                                                     

const prismaService = new PrismaServiceTests();

describe("UserController (listUser) Tests", () => {

    before(async () => {
        await prismaService._prismaServiceTests.users_Tests.deleteMany();
    });

    after(async () => {
        await prismaService._prismaServiceTests.users_Tests.deleteMany();
    });

    it("should be able to List a user, if the paramethers are ok", async () => {

        const user = {
            username: "Frank McGee",
            email: "capawoku@waphad.mk",
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: data2.accessToken
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.ok("user_id" in data3.user);
        assert.equal(data3.user.username, user.username);
        assert.equal(data3.user.email, user.email);
        assert.ok(data3.user.hasOwnProperty("createdAt"));
    });

    it("should not be able to List a user, if user dosen't have or dosen't set a valid (token)", async () => {

        const user = {
            username: "Marie Kennedy",
            email: "fodduji@paivobo.sv",
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: ""
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.strictEqual(data3.message, "jwt must be provided");
    });

    it("should not be able to List a user, if the (token) is not valid or fake", async () => {

        const user = {
            username: "Lida Beck",
            email: "towuhjo@albe.my",
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: "FAKE_TOKEN"
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "jwt malformed"
        });

    });

    it("should not be able to List a user, if (token) is not valid", async () => {

        const user = {
            username: "Celia Lyons",
            email: "na@ejacpib.tn",
            password: "1144"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "listUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: process.env.INVALID_TOKEN
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "invalid token"
        });

    });

    it("should not be able to List a user, if the (token) signature is not valid", async () => {

        const user = {
            username: "Ethan Lawson",
            email: "ecemim@wij.ba",
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: process.env.FAKE_TOKEN
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "invalid signature"
        });

    });

    it("should not be able to List a user, if user dosen't set a (user_id)", async () => {

        const user = {
            username: "Jerome Morton",
            email: "jutza@tiv.nr",
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: "",
            token: data2.accessToken
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "User ID must have a value !"
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

        const endPoint3 = "listUser";
        const request2 = {
            user_id: process.env.FAKE_USER_ID,
            token: data2.accessToken
        }

        const data3 = await makeGETRequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
          message: "User not found !"
        });

    });

});