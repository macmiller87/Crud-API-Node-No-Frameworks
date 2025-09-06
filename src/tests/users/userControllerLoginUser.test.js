import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js";
import { PrismaService } from "../../database/prisma/prismaService.js"
import { describe, it, before, after } from "node:test";;
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

});
