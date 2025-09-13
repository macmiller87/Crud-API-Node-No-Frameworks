import { makeDELETERequests } from "../../utils/FetchFunctionsTests/deleteFunction.js";
import { makePOSTRequests } from "../../utils/FetchFunctionsTests/postFunction.js";
import { PrismaService } from "../../database/prisma/prismaService.js";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";                                                                     

const prismaService = new PrismaService();

describe("UserController (deleteUser) Tests", () => {

    before(async () => {
        await prismaService._prismaService.users.deleteMany();
    });

    after(async () => {
        await prismaService._prismaService.users.deleteMany();
        await prismaService._prismaService.$disconnect();
    });

    it("should be able to delete a user, if the paramethers are ok", async () => {

        const user = {
            username: "Luella Reese",
            email: "op@ba.ao@pisseb.hk",
            password: "4499"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: data2.accessToken
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.strictEqual(data3.message, "User deleted with sucess !");
    });

    it("should not be able to Delete a user, if user dosen't have or dosen't set a valid (token)", async () => {
        
        const user = {
            username: "Melvin Logan",
            email: "faozeto@su.so",
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

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: ""
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.strictEqual(data3.message, "jwt must be provided");
    });
        
    it("should not be able to Delete a user, if the (token) is not valid or fake", async () => {
    
        const user = {
            username: "Samuel Gomez",
            email: "fowzepe@li.km",
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

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: "FAKE_TOKEN"
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "jwt malformed"
        });
    
    });
        
    it("should not be able to Delete a user, if (token) is not valid", async () => {
    
        const user = {
            username: "Mollie Miller",
            email: "menfa@hiubo.cm",
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

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: process.env.INVALID_TOKEN
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "invalid token"
        });
    
    });
        
    it("should not be able to DeletUser a user, if the (token) signature is not valid", async () => {
    
        const user = {
            username: "Abbie Bailey",
            email: "ojogu@joutowuh.dj",
            password: "2277"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: data2.user.user_id,
            token: process.env.FAKE_TOKEN
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "invalid signature"
        });

    });

    it("should not be able to Update a user, if user dosen't set a (user_id)", async () => {
    
        const user = {
            username: "Lewis Gibson",
            email: "to@za.mu",
            password: "4554"
        }
        
        const endPoint1 = "createUser";
        await makePOSTRequests(endPoint1, user);

        const endPoint2 = "loginUser";
        const request = {
            email: user.email,
            password: user.password
        }

        const data2 = await makePOSTRequests(endPoint2, request);

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: "",
            token: data2.accessToken
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "User id must have a value !"
        });

    });

    it("should not be able to DeleteUser a user, if (user_id) is not valid/wrong", async () => {

        const user = {
            username: "Lois Carlson",
            email: "po@bod.tv",
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

        const endPoint3 = "deleteUser";
        const request2 = {
            user_id: process.env.FAKE_USER_ID,
            token: data2.accessToken
        }

        const data3 = await makeDELETERequests(endPoint3, request2);

        assert.rejects(async () => {
            throw new TypeError(data3.message);
        }, {
            message: "User not found !"
        });

    });

});