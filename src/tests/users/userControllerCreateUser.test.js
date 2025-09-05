import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js"
import { PrismaService } from "../../database/prisma/prismaService.js"
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();

describe("User Controller (createUser) Tests", () => {

    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    it("Should be able to create a new User", async () => {
        
        const user = {
            username: "Chaves",
            email: "chaves@gmail.com",
            password: "2434"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.ok("user_id" in data.user);
        assert.equal(data.user.username, "Chaves");
        assert.equal(data.user.email, "chaves@gmail.com");
        assert.ok(data.user.hasOwnProperty("createdAt"));
    });

    it("Should not be able to create a new User, if (username) is missing", async () => {

        const user = {
            username: "",
            email: "kiko@gmail.com",
            password: "1234"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.rejects(async () => {
            throw new TypeError(data.message);
        },
            {
                message: 'All data must have a valaue, please check !',
            },
        );

    });

    it("Should not be able to create a new User, if (email) is missing", async () => {

        const user = {
            username: "kiko",
            email: "",
            password: "1234"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.rejects(async () => {
            throw new TypeError(data.message);
        },
            {
                message: 'All data must have a valaue, please check !',
            },
        );

    });

    it("Should not be able to create a new User, if (password) is missing", async () => {

        const user = {
            username: "kiko",
            email: "kiko@gmail.com",
            password: ""
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.rejects(async () => {
            throw new TypeError(data.message);
        },
            {
                message: 'All data must have a valaue, please check !',
            },
        );

    });

    it("Should not be able to create a new User, if (username) isn't a string", async () => {

        const user = {
            username: 4667,
            email: "vumizepib@go.kp",
            password: "1122"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.strictEqual(data.message, "All data must be a string !");
    });

    it("Should not be able to create a new User, if (email) isn't a string", async () => {

        const user = {
            username: "Tom Kim",
            email: 8899,
            password: "1122"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.strictEqual(data.message, "All data must be a string !");
    });

    it("Should not be able to create a new User, if (password) isn't a string", async () => {

        const user = {
            username: "Noah Riley",
            email: "isu@se.ni",
            password: 1122
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.strictEqual(data.message, "All data must be a string !")
    });

    it("Should not be able to create a new User, if (email) isn't a valid email", async () => {

        const user = {
            username: "Frank Fletcher",
            email: "somemailgmail.com",
            password: "1122"
        }

        const endPoint = "createUser";
        const data = await makePOSTRequests(endPoint, user);

        assert.strictEqual(data.message, "Please Put a Valid Email !");
    });

    it("Should not be able to create a new User, if (email) is already in use", async () => {

        const user1 = {
            username: "Johanna George",
            email: "somemail@gmail.com",
            password: "2266"
        }

        const user2 = {
            username: "Frank Fletcher",
            email: "somemail@gmail.com",
            password: "1122"
        }

        const endPoint = "createUser";
        await makePOSTRequests(endPoint, user1);
        const data2 = await makePOSTRequests(endPoint, user2);

        assert.strictEqual(data2.message, "User email is already in use !");
    });
  
});