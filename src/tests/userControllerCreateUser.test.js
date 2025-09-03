import { PrismaService } from "../database/prisma/prismaService.js"
import { describe, it, before, after } from "node:test";
import assert from "node:assert";

const prismaService = new PrismaService();
const baseURL = process.env.BASE_URL;

describe("User Controller (createUser) Tests", () => {
    let _server = {};

    before(async () => {
        _server = (await import("../server.js")).server;
        await new Promise(resolve => _server.once('listening', resolve));

        await prismaService._prismaService.users.deleteMany();
    });

    after(async (done) => {
        await prismaService._prismaService.users.deleteMany();
        _server.close(done);
    });

    it("Should be able to create a new User", async () => {
        
        const user = {
            username: "Chaves",
            email: "chaves@gmail.com",
            password: "2434"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 201);
            return response.json();

        }).then((datas) => {
            assert.ok("user_id" in datas.user);
            assert.equal(datas.user.username, "Chaves");
            assert.equal(datas.user.email, "chaves@gmail.com");
            assert.ok(datas.user.hasOwnProperty("createdAt"));

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (username) is missing", async () => {

        const user = {
            username: "",
            email: "kiko@gmail.com",
            password: "1234"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.rejects(async () => {
                throw new TypeError(datas.message);
            },
                {
                    message: 'All data must have a valaue, please check !',
                },
            );

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (email) is missing", async () => {

        const user = {
            username: "kiko",
            email: "",
            password: "1234"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.rejects(async () => {
                throw new TypeError(datas.message);
            },
                {
                    message: 'All data must have a valaue, please check !',
                },
            );

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (password) is missing", async () => {

        const user = {
            username: "kiko",
            email: "kiko@gmail.com",
            password: ""
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.rejects(async () => {
                throw new TypeError(datas.message);
            },
                {
                    message: 'All data must have a valaue, please check !',
                },
            );

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (username) isn't a string", async () => {

        const user = {
            username: 4667,
            email: "vumizepib@go.kp",
            password: "1122"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.strictEqual(datas.message, "All data must be a string !");

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (email) isn't a string", async () => {

        const user = {
            username: "Tom Kim",
            email: 8899,
            password: "1122"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.strictEqual(datas.message, "All data must be a string !");

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (password) isn't a string", async () => {

        const user = {
            username: "Noah Riley",
            email: "isu@se.ni",
            password: 1122
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.strictEqual(datas.message, "All data must be a string !")

        }).catch((error) => {
            console.log(error.msg);
        });

    });

    it("Should not be able to create a new User, if (email) isn't a valid email", async () => {

        const user = {
            username: "Frank Fletcher",
            email: "somemailgmail.com",
            password: "1122"
        }

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.strictEqual(datas.message, "Please Put a Valid Email !");

        }).catch((error) => {
            console.log(error.msg);
        });

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

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user1)

        }).catch((error) => {
            console.log(error.msg);
        });

        await fetch(`${baseURL}/createUser`, {
            method: "POST",
            body: JSON.stringify(user2)

        }).then((response) => {
            assert.strictEqual(response.status, 401);
            return response.json();

        }).then((datas) => {
            assert.strictEqual(datas.message, "User email is already in use !");

        }).catch((error) => {
            console.log(error.msg);
        });

    });
  
});
