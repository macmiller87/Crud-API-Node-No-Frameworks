import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js";
import { PrismaService } from "../../database/prisma/prismaService.js"
import { describe, it, before, after } from "node:test";
import assert from "node:assert";                                                                     

const prismaService = new PrismaService();

describe("UserController (loginUser) Tests", () => {

    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    it("should be able to login a user, if the paramethers are ok", async () => {

        const user = {
            username: "Cynthia Simmons",
            email: "he@si.pg",
            password: "1122"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.ok("user_id" in data2.user);
        assert.equal(data2.user.username, user.username);
        assert.equal(data2.user.email, user.email);
        assert.ok(data2.user.hasOwnProperty("createdAt"));
        assert.ok(data2.hasOwnProperty("accessToken"));
    });

    it("should not be able to login a user, if the (email) is missing", async () => {

        const user = {
            username: "Belle Carroll",
            email: "takowo@puruw.cl",
            password: "9944"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: "",
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "All data must have a value !"
        });

    });

    it("should not be able to login a user, if the (password) is missing", async () => {

        const user = {
            username: "Lou Holloway",
            email: "irovow@vele.ps",
            password: "6688"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: ""
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "All data must have a value !"
        });

    });

    it("should not be able to login a user, if the (email) isn't a string", async () => {

        const user = {
            username: "Samuel Potter",
            email: "tekwiha@uvuz.ma",
            password: "4466"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: 4466,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "All data must to be a string !"
        });

    });

    it("should not be able to login a user, if the (password) isn't a string", async () => {

        const user = {
            username: "Keith Jones",
            email: "ozesuhog@mop.nf",
            password: "4466"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: 4466
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "All data must to be a string !"
        });

    });

    it("should not be able to login a user, if the (email) isn't valid", async () => {

        const user = {
            username: "Caleb Gibson",
            email: "mawg@mail.com",
            password: "4466"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: "mawgmail.com",
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "Please Put a Valid Email !"
        });

    });

    it("should not be able to login a user, if the (email) is wrong or not fund", async () => {

        const user = {
            username: "Jason Hunter",
            email: "email@example.com",
            password: "4466"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: "email@examplee.com",
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "User email not found or wrong !"
        });

    });

    it("should not be able to login a user, if the (password) is wrong", async () => {

        const user = {
            username: "Hester Mendoza",
            email: "tifazid@ezuze.dk",
            password: "7733"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: "7734"
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        assert.rejects(async () => {
            throw new TypeError(data2.message);
        }, {
            message: "User password wrong !"
        });

    });

});
