import { PrismaClient as PrismaClient2 } from "@internal/prisma-second/client/client.js";

export class PrismaServiceTests {
    _prismaServiceTests;

    constructor(prismaServiceTests = new PrismaClient2()) {
        this._prismaServiceTests = prismaServiceTests;
    }
    
}